from django.urls import path
from . views import *
from . import views

urlpatterns = [
	path('', views.SharerView, name='sharer-view'),
    path('sharer-upload', views.SharerUploadViews.as_view(), name='sharer-post'),
    path('sharer-upload-list', views.SharerUploadListView, name='sharer-post-list'),
    path('sharer-profile/<int:sharer_id>/', views.SharerProfileDetail.as_view(), name='sharer-profile'),
    path('user-sharer-profile/', views.UserSharerProfile.as_view(), name='my-profile'),
]