from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .models import Product,Prediction_Model
from .model_loader import load_models
import numpy as np
import json


# ENDPOINTS for GET REQUEST

@csrf_exempt
def list_models(request):
    models = Prediction_Model.objects.all()
    models =  [ {"product_name": model.product.name, "model_name" : model.name,"available" : bool(model.model_path) } for model in models]
    return JsonResponse({'available_models': models})

@csrf_exempt
def list_products(request):
    products_data =Product.objects.all()
    all_product_list = {f"product_{count+1}":{"product_id":product.id,"product_name":product.name,"product_price":product.price,"product_desc":product.description} for count,product in enumerate(products_data)}
    return JsonResponse(all_product_list,safe=False)



@csrf_exempt
def add_product(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        product_name = data.get('product_name').lower()
        product_price = data.get('product_price')
        product_desc = data.get('product_desc')
        
        #Creating a new Product instance and saving it to the database
        product_instance = Product(name=product_name, price=product_price, description=product_desc)
        product_instance.save()
        Prediction_Model.objects.create(name=f"{product_name}_model", product=product_instance)

        return JsonResponse({'success': True, 'message': f'Product {product_name} added successfully'})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



   



@csrf_exempt
def predict(request, model_name):
    model_name =model_name.lower()
    global MODELS
    if MODELS is None:
        MODELS = load_models(settings.MODEL_PATHS)

    if model_name not in MODELS:
        return JsonResponse({'error': f"Model '{model_name}' not found",'model_exists':False}, status=404)

    if request.method == 'POST':
        data = json.loads(request.body)
        price = data.get('price')
        fuel_price = data.get('fuel_price')
        period = data.get('time_period')
        time_period = {'daily': 1, 'weekly': 7, 'monthly': 30}

        model = MODELS[model_name]

        exog = list(np.array([price, fuel_price]).reshape(1, -1)) * time_period[period]
        prediction = model.forecast(steps=time_period[period], exog=exog)
        print(prediction)
        return JsonResponse({'expected_sales': int(prediction.sum()),'model_exists':True})
    
    return JsonResponse({'message': 'Method Not Allowed'},safe=False)


@csrf_exempt
def delete_product(request,product_id):
    product = Product.objects.get(id=product_id)
    name = product.name
    if request.method == 'DELETE':
        product.delete()
        return JsonResponse({"message" : f" Product '{name}' Removed Successfully!","deleted" : True})
    return JsonResponse({'message': 'Method not allowed'})


