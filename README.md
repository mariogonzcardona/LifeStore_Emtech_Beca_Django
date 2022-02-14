# Beca Santander EmTech
![santander](https://emtech.digital/santanderskills/landing/img/santander_1.png)

![EmTech](https://emtech.digital/santanderskills/landing/img/logo_emtech.png)
## _Proyecto LifeStore_

Este proyecto está desarrollado en Python 3.9 y Django Framework

LifeStore es una tienda virtual que maneja una amplia gama de artículos, recientemente, la Gerencia de ventas, se percató que la empresa tiene una importante acumulación de inventario. Asimismo, se ha identificado una reducción en las búsquedas de un grupo importante de productos, lo que ha redundado en una disminución sustancial de sus ventas del último trimestre.

## Consigna

- Productos más vendidos y productos rezagados a partir del análisis de las categorías con menores ventas y categorías con menores búsquedas.
- Productos por reseña en el servicio a partir del análisis de categorías con mayores ventas y categorías con mayores búsquedas.
- Sugerir una estrategia de productos a retirar del mercado, así como sugerencia de cómo reducir la acumulación de inventario considerando los datos de ingresos y ventas mensuales.

## Proyectos Relacionados
- [Google Colaboratory](https://colab.research.google.com/drive/1Mg70hQjWDOAmVfmd2dw39_Nfhz1B6hM7?usp=sharing): Este proyecto está elaborado para comprobar la obtención de resultados a través de Pandas.
- [Python por Consola](https://github.com/mariogonzcardona/LifeStore_Emtech_Beca): Este proyecto contiene el funcionamiento de entrada por consola, con validaciones.
- [Lifestore-Django](http://lifestoreapp.pythonanywhere.com/login/): Este proyecto esta desplegado en Pythonanywhere, por lo que está en completo funcionamiento.

## Tecnología

En este proyecto se enlistan las siguientes librerías para poder desarrollar los puntos solicitados utilizando el Framework Django.
| Plugin | Versión |
| ------ | ------ |
|asgiref|3.5.0|
|Django|4.0.2|
|numpy|1.22.2|
|pandas|1.4.0|
|python-dateutil|2.8.2|
|pytz|2021.3|
|six|1.16.0|
|sqlparse|0.4.2|
|tabulate|0.8.9|
|tzdata|2021.5|

Para poder ejecutar el programa es neceario crear un ambiente virtual e instalar las dependencias en el archivo requirements.txt:

## Instalación

Instale las dependencias de requirements.txt y ejecute los siguientes comandos.

```sh
virtualenv env
source env/Scripts/activate
pip install -r requirements.txt
django-admin startproject lifestore
python manage.py migrate
python manage.py createapp core
python manage.py createapp login
python manage.py runserver
```

## Ejecucion
El desarrollo del la interfaz se llevo acabo usando un template generico de [Creative Tim](https://www.creative-tim.com/), Se utilizo este template para adaptar a las necesidades del proyecto, [Material Dasboard Django](https://www.creative-tim.com/product/material-dashboard-django)

#### _Primera sección Login:_

```sh
user: user@emtech.com
password: LifeStore01.
```

![Login](https://github.com/mariogonzcardona/LifeStore_Emtech_Beca_Django/blob/main/Fotos/Login_Django.png?raw=true)

#### _Para la sección del Menu:_

Se implemento un sistema de menu vertical para los diferentes puntos del proyecto, estan distribuidos de la siguiente manera:

> Punto 1.1: Dos tablas con Productos con Mayores Ventas y Busquedas.
> Punto 1.2: Dos tablas con Productos con Menores Ventas y Busquedas por categoria.
> Punto 2: Dos tablas con Productos con Mejores y Peores reseñas.
> Punto 3.1: Una tabla del Total de ingresos y ventas promedio mensuales.
> Punto 3.2: Total de Ingresos por Año.
> Punto 3.3: Meses con mayores ventas en el año 2020.

![SideBar](https://github.com/mariogonzcardona/LifeStore_Emtech_Beca_Django/blob/main/Fotos/Sidebar.png?raw=true)

#### _Para la sección del Punto 1:_
![Point_1.1](https://github.com/mariogonzcardona/LifeStore_Emtech_Beca_Django/blob/main/Fotos/Mayores_Ventas.png?raw=true)

![Point_1.2](https://github.com/mariogonzcardona/LifeStore_Emtech_Beca_Django/blob/main/Fotos/Mayores_Busquedas.png?raw=true)

#### _Para la sección del Punto 2:_
![Point_2+](https://github.com/mariogonzcardona/LifeStore_Emtech_Beca_Django/blob/main/Fotos/Mejores_Rese%C3%B1as.png?raw=true)

![Point_2-](https://github.com/mariogonzcardona/LifeStore_Emtech_Beca_Django/blob/main/Fotos/Peores_Rese%C3%B1as.png?raw=true)

#### _Para la sección del Punto 3:_
Para El punto 3.1: Total de ingresos y ventas promedio por mes.
![Point_3.1](https://github.com/mariogonzcardona/LifeStore_Emtech_Beca_Django/blob/main/Fotos/Total_por_mes.png?raw=true)

Para el punto 3.2 Total de ingresos anuales para el 2020.
![Point_3.2](https://github.com/mariogonzcardona/LifeStore_Emtech_Beca_Django/blob/main/Fotos/Total_anual.png?raw=true)

Para el punto 3.3 Total de de ventas para los primeros 5 meses con mayores ventas.
![Point_3.3](https://github.com/mariogonzcardona/LifeStore_Emtech_Beca_Django/blob/main/Fotos/Total_ventas.png?raw=true)

#### _Para la sección de Administrador :_
[http://lifestoreapp.pythonanywhere.com/admin/](http://lifestoreapp.pythonanywhere.com/admin/)

Es necesario ingresar con el siguiente acceso para poder agregar mas datos para, lifestore_products, lifestore_searches, lifestore_sales.

```sh
user: mario
password: Mario01.
```
![Django Admin](https://github.com/mariogonzcardona/LifeStore_Emtech_Beca_Django/blob/main/Fotos/Django_admin.png?raw=true)
## Licencia

Apache License

**Free Software, Hell Yeah!**
