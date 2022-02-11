from django.contrib import admin
from .models import Product, Sale, Search

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    # readonly_fields=('created','updated')
    list_display=('name','price','category','stock')
    
class SaleAdmin(admin.ModelAdmin):
    # readonly_fields=('created','updated')
    list_display=('id_sale','id_product','score','date','refund')
    
class SearchAdmin(admin.ModelAdmin):
    # readonly_fields=('created','updated')
    list_display=('id_search','id_product')

admin.site.register(Product,ProductAdmin)
admin.site.register(Sale,SaleAdmin)
admin.site.register(Search,SearchAdmin)
