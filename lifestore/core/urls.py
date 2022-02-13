from django.urls import path
from . import views
urlpatterns=[
    path("",views.point_1_1,name="point_1_1"),
    path("point_1_2/",views.point_1_2,name="point_1_2"),
    path("getResultByCat/<str:category>",views.getResultByCat,name="getResultByCat"),
    path("point_2/",views.point_2,name="point_2"),
    path("point_3_1/",views.point_3_1,name="point_3_1"),
    path("point_3_2/",views.point_3_2,name="point_3_2"),
    path("point_3_3/",views.point_3_3,name="point_3_3"),
]