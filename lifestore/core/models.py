from unicodedata import category
from django.db import models
from django.db.models.fields import IntegerField
from django.utils.timezone import now
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator 


"""
This is the LifeStore_SalesList data:
lifestore_searches = [id_search, id product]
lifestore_sales = [id_sale, id_product, score (from 1 to 5), date, refund (1 for true or 0 to false)]
lifestore_products = [id_product, name, price, category, stock]
"""

# Create your models here.
class Product (models.Model):
    id_product =  models.IntegerField(primary_key=True,verbose_name="ID Product")
    name = models.CharField(max_length=200,verbose_name="Nombre Producto")
    price = models.FloatField(verbose_name="Precio")
    category = models.CharField(max_length=200,verbose_name="Categoria")
    stock = models.IntegerField(verbose_name="Stock")

    #Metadata
    class Meta :
        verbose_name='producto'
        verbose_name_plural='productos'

    def __str__(self):
        return self.name


class Sale (models.Model):
    id_sale = models.IntegerField(primary_key=True,verbose_name="ID Venta")
    id_product=models.IntegerField(verbose_name="ID Producto")
    score=models.IntegerField(verbose_name="Puntuacion",validators=[MinValueValidator(1), MaxValueValidator(5)])
    date=models.DateTimeField(auto_now_add=True,verbose_name='Fecha de Venta')
    refund=models.IntegerField(verbose_name="Devolucion",validators=[MinValueValidator(0), MaxValueValidator(1)])
    
    #Metadata
    class Meta :
        verbose_name='venta'
        verbose_name_plural='ventas'

    def __str__(self):
        return self.id_sale
    
class Search (models.Model):
    id_search = models.IntegerField(primary_key=True,verbose_name="ID Busqueda")
    id_product=models.IntegerField(verbose_name="ID Producto")
    # created=models.DateTimeField( auto_now_add=True,verbose_name='Fecha de Creacion')
    # updated=models.DateTimeField( auto_now=True,verbose_name='Fecha de Actualizacion')

    #Metadata
    class Meta :
        verbose_name='busqueda'
        verbose_name_plural='busquedas'

    def __str__(self):
        return self.id_search