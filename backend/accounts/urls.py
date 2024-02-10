from django.urls import path
from . import views
from .views import *

urlpatterns = [
	path('register/', views.UserRegister.as_view(), name='register'),
	path('login/', views.UserLogin.as_view(), name='login'),
    # path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
	path('logout/', views.UserLogout.as_view(), name='logout'),
	path('user/profile/', views.UserView.as_view(), name='user-profile'),
    path('user/', views.UserProfileView.as_view(), name='user'),
    path('user/be-sharer', views.Be_sharer.as_view(), name='user-be-sharer'),
     path('request-reset-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete')
    
]


# FIX THAT UNAUTH