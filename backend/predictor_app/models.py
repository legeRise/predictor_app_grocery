from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100,blank=False)
    price = models.IntegerField(blank=False)
    description = models.TextField()

    def __str__(self):
        return self.name 
    

class Prediction_Model(models.Model):
    name = models.CharField(max_length=100, blank=False)
    model_path = models.CharField(max_length=255, blank=True)
    product = models.OneToOneField(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    

class Dataset(models.Model):
    date = models.DateField(auto_now_add=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.IntegerField()
    sales = models.IntegerField()

    def __str__(self):
        return f"Data for {self.product.name} on {self.date}"
    




    



