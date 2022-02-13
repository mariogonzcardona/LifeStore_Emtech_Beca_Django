from django.http.response import JsonResponse
from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt
from .models import Product,Sale,Search
import pandas as pd
import calendar
import json

# Create your views here.
@csrf_exempt
def point_1_1(request):
    # Si estamos identificados devolvemos la portada
    if request.user.is_authenticated:
        context = {}
        df_sales, df_searches= process_report_1(1)
        data_sales=df_to_json_list(df_sales)
        data_searches=df_to_json_list(df_searches)
        context = {
            'segment': 'point_1_1',
            'data_sales': data_sales,
            'data_searches': data_searches,
        }
        return render(request,"core/point_1_1.html",context)
    # En otro caso redireccionamos al login
    return redirect('/login/')

@csrf_exempt
def point_1_2(request):
    # Si estamos identificados devolvemos la portada
    if request.user.is_authenticated:
        context = {}
        category_list=process_report_1(2)
        
        context = {
            'segment': 'point_1_2',
            'category_list': category_list,
        }
        return render(request,"core/point_1_2.html",context)
    # En otro caso redireccionamos al login
    return redirect('/login/')

@csrf_exempt
def point_2(request):
    # Si estamos identificados devolvemos la portada
    if request.user.is_authenticated:  
        context = {}
        df_score_max, df_score_min=process_report_2()
        df_score_max_res=df_to_json_list(df_score_max)
        df_score_min_res=df_to_json_list(df_score_min)
        context = {
            'segment': 'point_2',
            'df_score_max_res': df_score_max_res,
            'df_score_min_res': df_score_min_res,
        } 
        return render(request,"core/point_2.html",context)
    # En otro caso redireccionamos al login
    return redirect('/login/')

@csrf_exempt
def point_3_1(request):
    # Si estamos identificados devolvemos la portada
    if request.user.is_authenticated:  
        context = {}
        dfs=generate_dfs() # df_searches, df_sales, df_products
        df_month=show_report_total_monthly_income(dfs[1],dfs[2])
        data_total=df_to_json_list(df_month)
        context = {
            'segment': 'point_3_1',
            'data_total': data_total,
        } 
        return render(request,"core/point_3_1.html",context)
    # En otro caso redireccionamos al login
    return redirect('/login/')

@csrf_exempt
def point_3_2(request):
    # Si estamos identificados devolvemos la portada
    if request.user.is_authenticated:  
        context = {}
        dfs=generate_dfs() # df_searches, df_sales, df_products
        df_month=show_report_total_monthly_income(dfs[1],dfs[2])
        total_anual='{:,.2f}'.format(df_month['total_revenue'].sum())
        context = {
            'segment': 'point_3_2',
            'total_anual': total_anual,
        } 
        return render(request,"core/point_3_2.html",context)
    # En otro caso redireccionamos al login
    return redirect('/login/')

@csrf_exempt
def point_3_3(request):
    # Si estamos identificados devolvemos la portada
    if request.user.is_authenticated:  
        context = {}
        dfs=generate_dfs() # df_searches, df_sales, df_products
        df_month=show_report_total_monthly_income(dfs[1],dfs[2])
        df_month=df_month[['month','total_sales']].sort_values(by=['total_sales'],ascending=False)[:5]
        data_result=df_to_json_list(df_month)
        context = {
            'segment': 'point_3_3',
            'data_result': data_result,
        } 
        return render(request,"core/point_3_3.html",context)
    # En otro caso redireccionamos al login
    return redirect('/login/')


# getResultByCategory
def getResultByCat(request,category):
    dfs=generate_dfs() # df_searches, df_sales, df_products
    dict_categories=generate_dict_categories(dfs[2])
    df_low_sales=reduce_df(dfs[1],'sales',300,True)
    df_low_searches=reduce_df(dfs[0],'searches',300,True)
    data_lower_sales=get_lowler_df_by_cat(dict_categories[category],df_low_sales,'sales',5)
    data_lower_searches=get_lowler_df_by_cat(dict_categories[category],df_low_searches,'searches',10)
    
    data_sales=df_to_json_list(data_lower_sales)
    data_searches=df_to_json_list(data_lower_searches)
        
    return JsonResponse({"data_sales":data_sales,"data_searches":data_searches})

# Funciones para DataFrames
def process_report_1(option):
    dfs=generate_dfs() # df_searches, df_sales, df_products
    if option == 1:
        # Mostrar reporte de productos con mayores ventas y busquedas
        df_sales=filter_products_searches(dfs[1],dfs[2],'sales',10)
        df_searches=filter_products_searches(dfs[0],dfs[2],'searches',10)
        return df_sales, df_searches
    elif option == 2:
        # Proceso para mostrar reportes por categoria con menores ventas y busquedas
        category_list=dfs[2]['category'].unique()
        return category_list.tolist()
    
def process_report_2():
    dfs=generate_dfs() # df_searches, df_sales, df_products
    df_min_max=score_avg_min_max(dfs[1],dfs[2],10)
    df_score_max= df_min_max[0].round(decimals = 2)
    df_score_min= df_min_max[1].round(decimals = 2)
    return df_score_max, df_score_min

def generate_dfs():
    # Generamos DataFrames
    df_searches = pd.DataFrame(list(Search.objects.all().values()))
    df_sales = pd.DataFrame(list(Sale.objects.all().values()))
    df_products = pd.DataFrame(list(Product.objects.all().values()))
    return df_searches, df_sales, df_products
    
# Funcion para reducir y contar la frecuencia de un df de acuerdo a la columna de id_product
def reduce_df(df, col_name,count,ascending=False):
    df_res=df['id_product'].value_counts(ascending = ascending)[0:count]
    return pd.DataFrame({'id_product':df_res.index, col_name:df_res.values})

# Mezcla de dataframes de reduce_df y df_products
def filter_products_searches(df,df_products,col_name,count):
    df_result=reduce_df(df,col_name, count)
    df_res=pd.merge(df_result, df_products, on="id_product")
    return df_res[['id_product','name',col_name,'price','category','stock']]

# Generar un diccionario con las categorias y sus respectivos df
def generate_dict_categories(df_products):
    categories=df_products['category'].unique()
    dict_categories={}
    for category in categories:
        dict_categories[category]=df_products.loc[df_products['category'] == category]
    return dict_categories

# Mostrar reporte de productos con menores ventas y busquedas por categorias en total son 8
def get_lowler_df_by_cat(df_category,df_reduce, col_name, count):
    df_categories_res = pd.merge(df_category, df_reduce, on="id_product")
    if df_categories_res.empty:
        return 0
    else:
        df_cat_res=df_categories_res.sort_values(by=[col_name],ascending=True)[0:count]
        return df_cat_res[['id_product','name',col_name,'price','category','stock']]

# Generar dataframe de productos con el promedio de reseñas
def score_avg_min_max(df_sales,df_products,count):
    data=[]
    for i in range(1,len(df_products)+1):
        data.append([i, df_sales.loc[df_sales['id_product'] == i]['score'].mean()])
    df_score=pd.DataFrame(data,columns=['id_product','score_avg'])
    df_score = df_score[df_score['score_avg'].notna()]
    df_res=pd.merge(df_score, df_products, on="id_product")
    
    df_score_max=df_res.sort_values('score_avg',ascending=False)[0:count]
    df_score_min=df_res.sort_values('score_avg',ascending=True )[0:count]
    
    return df_score_max, df_score_min

# Generar dataframe para ventas totales, promedio, mensuales y anuales.
def show_report_total_monthly_income(df_sales,df_products):
    # Dentro del dataframe de df_sales aseguramos que la columna de date sea de tipo datetime
    df_sales['date'] = pd.to_datetime(df_sales['date'],format='%d/%m/%Y') 
    # Quitamos los productos que fueron devueltos es decir refund == 1
    monthly_sales = df_sales.drop(df_sales[df_sales.refund == 1].index)
    dict_sales_monthly={}
    months_list=[]
    total_revenue=[]
    total_sales=[]
    avg_list=[]
    for x in range(1,13):
        by_monthly_sales= monthly_sales[monthly_sales['date'].dt.month == x]
        df_res=reduce_df(by_monthly_sales,'sale_count',300,ascending = True)
        df_res=df_res.sort_values(by=['id_product'],ascending=True)
        
        id_products_list=list(df_res.id_product)
        # Total de ventas por mes
        counter_sales=sum(list(df_res.sale_count))
        
        list_sales_monthly=[]

        for m in id_products_list:
            price_value = df_products.loc[df_products.id_product==m, 'price'].values[0]
            sale_count = df_res.loc[df_res.id_product==m, 'sale_count'].values[0]
            list_sales_monthly.append(price_value*sale_count)
        months_list.append(calendar.month_name[x])
        total_revenue.append(sum(list_sales_monthly))
        avg_list.append(0 if counter_sales==0 else sum(list_sales_monthly)/counter_sales)
        total_sales.append(counter_sales)
    dict_sales_monthly={
        "month":months_list,
        "total_revenue":total_revenue,
        "avg_sales":avg_list,
        "total_sales":total_sales
    }
    df_month=pd.DataFrame.from_dict(dict_sales_monthly)
    df_month['avg_sales']=df_month['avg_sales'].round(decimals = 2)
    return df_month

# Transformar el DataFrame a formato json.
def df_to_json_list(df):
    if isinstance(df, int):
        return 0
    return json.loads(df.reset_index().to_json(orient ='records'))