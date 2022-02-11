from django.urls import path
from . import views
urlpatterns=[
    path("",views.home,name="home"),
    path("point_1/",views.point_1,name="point_1"),
    path("point_2/",views.point_2,name="point_2"),
    path("point_3/",views.point_3,name="point_3"),
]