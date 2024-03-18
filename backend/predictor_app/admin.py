from django.contrib import admin
from .models import Product,Prediction_Model,Dataset

# Register your models here.

admin.site.register(Product)
admin.site.register(Prediction_Model)
admin.site.register(Dataset)