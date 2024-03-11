from django.urls import path
from . import views

urlpatterns = [
    path('list_models/', views.all_models, name='all_models'),
    path('model/<str:model_name>_predict/', views.predict, name='predict'),
    path('add_product/', views.add_product, name='add_product'),
    path('list_products/', views.all_products, name='all_products'),
]
