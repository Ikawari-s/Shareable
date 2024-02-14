from django.contrib.auth import login, logout, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from .validation import custom_validation, validate_email, validate_password
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from django.contrib.auth.models import User
from django.contrib.auth.models import AnonymousUser  # Import AnonymousUser
from rest_framework.exceptions import NotFound
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import ResetPasswordEmailRequestSerializer
from .models import AppUser
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util
from django.http import HttpResponsePermanentRedirect
from django.conf import settings
from rest_framework.permissions import AllowAny
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model
User = get_user_model()



class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save(is_active=False)
            if user:
                user.send_otp()
                return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class SendOTP(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            user = AppUser.objects.get(email=request.data['email'])
        except ObjectDoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

        user.send_otp()
        return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)

class ResendOTP(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            user = AppUser.objects.get(email=request.data['email'])
        except ObjectDoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

        user.send_otp()
        return Response({"message": "OTP resent successfully"}, status=status.HTTP_200_OK)

class VerifyOTP(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            user = AppUser.objects.get(email=request.data['email'])
        except ObjectDoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

        otp = request.data.get('otp', '')

        if user.verify_otp(otp):
            user.is_active = True
            user.save()
            return Response({"message": "OTP verified successfully and user activated"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid OTP or OTP expired"}, status=status.HTTP_400_BAD_REQUEST)

    


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (JWTAuthentication,)

    def post(self, request):
        data = request.data
        validate_email(data)
        validate_password(data)

        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = authenticate(request, username=data['email'], password=data['password'])

            if user:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                # FOR TEST ONLY 
                print(f'Access Token: {access_token}')
                print(f'Refresh Token: {str(refresh)}')

                response_data = {'access_token': access_token, 'user_info': serializer.data}
                return JsonResponse(response_data, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)



class UserView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)


class UserProfileView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        AppUser = get_user_model()
        users = AppUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    

class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = [settings.APP_SCHEME, 'http', 'https']

class RequestPasswordResetEmail(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        email = request.data.get('email', '')

        User = get_user_model()  # Retrieve the custom user model

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relative_link = reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
            redirect_url = request.data.get('redirect_url', '')
            abs_url = 'http://' + current_site + relative_link
            email_body = f'Hello,\nUse the link below to reset your password:\n{abs_url}?redirect_url={redirect_url}'
            data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Reset your password'}
            Util.send_email(data)
            return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        else:
            # If the email is not found, return an error response
            return Response({'error': 'No user found with this email address'}, status=status.HTTP_404_NOT_FOUND)
        
class PasswordTokenCheckAPI(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):

        redirect_url = request.GET.get('redirect_url')

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                if len(redirect_url) > 3:
                    return CustomRedirect(redirect_url+'?token_valid=False')
                else:
                    return CustomRedirect(settings.EMAIL_HOST_USER+'?token_valid=False')

            if redirect_url and len(redirect_url) > 3:
                return CustomRedirect(redirect_url+'?token_valid=True&message=Credentials Valid&uidb64='+uidb64+'&token='+token)
            else:
                return CustomRedirect(settings.EMAIL_HOST_USER+'?token_valid=False')

        except DjangoUnicodeDecodeError as identifier:
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return CustomRedirect(redirect_url+'?token_valid=False')
                    
            except UnboundLocalError as e:
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)



class SetNewPasswordAPIView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)



# NOT YET WORKING
class Be_sharer(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request):
        try:
            if request.method == 'POST':
                page_name = request.data.get('page_name')
                if page_name:
                    try:
                        user = AppUser.objects.get(email=request.user.email)
                        user.is_sharer = True
                        user.save()
                        return Response({'message': 'User is now a sharer'}, status=status.HTTP_200_OK)
                    except AppUser.DoesNotExist:
                        raise NotFound("User not found")
                else:
                    return Response({'error': 'Missing page_name parameter'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response({'error': f'Internal Server Error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
















# ATTEMPTS PARA AYUSIN TO, wag niyo na muna alisin sa dulo nalang



# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)

#         serializer = UserSerializerWithToken(self.user).data

#         for k, v in serializer.items():
#             data[k] = v

#         return data

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer
