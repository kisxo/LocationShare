from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("updatelocation/", views.updatelocation, name="updatelocation"),
]