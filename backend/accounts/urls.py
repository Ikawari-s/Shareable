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
     path('request-reset-email/', RequestPasswordResetEmail.as_view(), name="request-reset-email"),
     path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
     path('password-reset-complete/', SetNewPasswordAPIView.as_view(),name='password-reset-complete'),
     path('profile/update/', ProfileUpdateView.as_view(), name='profile-picture-update'),
     # path('rating/', Rating, name="rating"),
     path('change-password/', change_password, name='change_password'),

     path('send-otp/', SendOTP.as_view(), name="send-otp"),
     path('verify-otp/', VerifyOTP.as_view(), name="verify-otp"),
     path('resend-otp/', ResendOTP.as_view(), name='resend-otp'),
     path('be-sharer/', Be_sharer.as_view(), name="be-sharer"),
     path('follow-sharer/<int:sharer_id>', FollowSharer.as_view(), name='follow-sharer'),
     path('unfollow-sharer/<int:sharer_id>/', UnfollowSharer.as_view(), name='unfollow-sharer'),
     path('followed-sharers/', FollowedSharerList.as_view(), name='followed-sharers'),


     path('checker/', views.SharerChecker.as_view(), name='sharer-checker'),
]


