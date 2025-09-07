from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('test/', views.api_test, name='api_test'),
    path('banner/', views.banner_list, name='banner_list'),
    path('dapp/', views.dapp_list, name='dapp_list'),
    path('favorite/', views.favorite_list, name='favorite_list'),
]
