from django.urls import path
from . import views

urlpatterns = [

    path('list_models/', views.list_models, name='all_models'),
    path('list_products/', views.list_products, name='all_products'),
    path('add_product/', views.add_product, name='add_product'),
    path('delete_product/<str:product_id>', views.delete_product, name='delete_product'),
    
    # prediction
    path('model/<str:model_name>_predict/', views.predict, name='predict'),
]
