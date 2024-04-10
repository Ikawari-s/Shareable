from django.urls import path
from .views import *

urlpatterns = [
    path('user-dashboard/', AdminUserDashboard.as_view(), name='admin-user-dashboard'),
    path('user-dashboard/<int:pk>/', AdminUserPatchDelete.as_view(), name='admin-user-patch-delete'),
    path('sharer-dashboard/', AdminSharerDashboard.as_view(), name='admin-sharer-dashboard'),
    path('send-income/<int:sharer_id>/', AdminSendIncome.as_view(), name='admin-send-income'), 
    path('patch-sharer/<int:sharer_id>/', AdminPatchSharer.as_view(), name='admin-send-income'), 
    path('search-user/', SearchUser.as_view(), name='search-user'),
    path('search-sharer/', SearchSharer.as_view(), name='search-sharer'),
    path('user-contacts/', UserContacts.as_view(), name='user-contacts'),
    path('delete-contact/<int:pk>/', DeleteContacts.as_view(), name='delete-contact'),

]
