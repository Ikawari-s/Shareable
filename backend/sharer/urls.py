from django.urls import path
from . import views

urlpatterns = [
	path('', views.SharerView, name='sharer-view'),
]