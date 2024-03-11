from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .models import Product
from .model_loader import load_models
import numpy as np
import json

MODELS = None


@csrf_exempt
def all_products(request):
    products_data =Product.objects.all()
    all_product_list = {f"product_{count+1}":{"product_id":product.id,"product_name":product.name,"product_price":product.price,"product_desc":product.description} for count,product in enumerate(products_data)}
    print(all_product_list)


    return JsonResponse(all_product_list,safe=False)

@csrf_exempt
def add_product(request):
    if request.method == 'POST':
        print('yep the method is post')
        data = json.loads(request.body)
        print(data)
        product_name = data.get('product_name').lower()
        product_price = data.get('product_price')
        product_desc = data.get('product_desc')
        print(product_name,product_price,product_desc)
        # Creating a new Product instance and saving it to the database
        new_product = Product(name=product_name, price=product_price, description=product_desc)
        new_product.save()
 
        return JsonResponse({'success': True, 'message': f'Product {product_name} added successfully'})
    else:
        # Handle GET requests if needed
        return JsonResponse({'error': 'Only POST requests are allowed for adding products'}, status=405)




@csrf_exempt
def all_models(request):
    global MODELS
    if MODELS is None:
        MODELS = load_models(settings.MODEL_PATHS)
    return JsonResponse({'available_models': list(settings.MODEL_PATHS.keys())})


@csrf_exempt
def predict(request, model_name):
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
