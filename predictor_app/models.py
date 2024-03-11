from django.db import models

# Create your models here.


from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100,blank=False)
    price = models.IntegerField(blank=False)
    description = models.TextField()

    def __str__(self):
        return self.name

