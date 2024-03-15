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
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, status
from rest_framework.response import Response
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
from sharer.models import *
from rest_framework.permissions import IsAuthenticated
from sharer.serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.cache import cache
from datetime import datetime, timedelta
User = get_user_model()



class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            username = serializer.validated_data['username']
            
            if get_user_model().objects.filter(username=username).exists():
                return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
            
            user = serializer.save(is_active=False)
            if user:
                if not user.is_active:
                    otp_id = ''.join(random.choices(string.ascii_letters + string.digits, k=16))  # Generate OTP ID
                    user.send_otp(otp_id)  # Pass OTP ID to send_otp method
                    return Response({"message": "OTP sent successfully", "userId": user.id, "otpId": otp_id}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "User is already active"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class SendOTP(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = SendOTPSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user_id = serializer.validated_data['user_id']
            otp_id = serializer.validated_data.get('otp_id') 
            try:
                user = AppUser.objects.get(id=user_id)
            except ObjectDoesNotExist:
                return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
            
            if user.is_active:
                return Response({"error": "User is already active"}, status=status.HTTP_400_BAD_REQUEST)

            user.send_otp(otp_id)  
            return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)

class ResendOTP(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = ResendOTPSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user_id = serializer.validated_data['user_id']
            try:
                user = AppUser.objects.get(id=user_id)
            except ObjectDoesNotExist:
                return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
            
            if user.is_active:
                return Response({"error": "User is already active"}, status=status.HTTP_400_BAD_REQUEST)

            last_sent_time = cache.get(f'resend_otp_{user_id}_time')
            if last_sent_time:
                time_since_last_sent = datetime.now() - last_sent_time
                if time_since_last_sent < timedelta(seconds=60):
                    time_remaining = timedelta(seconds=60) - time_since_last_sent
                    return Response({"error": f"Please wait {time_remaining.seconds} seconds before resending OTP"}, status=status.HTTP_400_BAD_REQUEST)

            otp_id = user.otp_id  
            user.send_otp(otp_id)  
            cache.set(f'resend_otp_{user_id}_time', datetime.now(), timeout=60)  
            return Response({"message": "OTP resent successfully", "otpId": otp_id}, status=status.HTTP_200_OK)


        
class VerifyOTP(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user_id = serializer.validated_data['user_id']
            otp = serializer.validated_data['otp']
            otp_id = serializer.validated_data['otp_id']
            
            try:
                user = AppUser.objects.get(id=user_id)
            except ObjectDoesNotExist:
                return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
            
            if user.is_active:
                return Response({"error": "User is already active"}, status=status.HTTP_400_BAD_REQUEST)

            if user.verify_otp(otp, otp_id): 
                user.is_active = True
                user.save()
                return Response({"message": "OTP verified successfully and user activated"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid OTP, OTP expired, or OTP ID mismatch"}, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = (JWTAuthentication,)

    def post(self, request):
        data = request.data
        # Your validation code here
        validate_email(data)
        validate_password(data)

        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = authenticate(request, username=data['email'], password=data['password'])

            if user:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                is_sharer = user.is_sharer
                sharer_id = None
                profile_picture = None
                name = None
                rating_id = None

                if is_sharer:
                    try:
                        sharer = Sharer.objects.get(user=user)
                        sharer_id = sharer.id
                        profile_picture = sharer.image.url
                        name = sharer.name
                    except Sharer.DoesNotExist:
                        pass
                else:
                    profile_picture = user.profile_picture.url if user.profile_picture else None
                    name = user.username

                followed_sharers = user.follows.values_list('id', flat=True)
                comments = Comment.objects.filter(user=user).values_list('id', flat=True)

                try:
                    rating = Rating.objects.filter(user=user).first()
                    if rating:
                        rating_id = rating.id
                except Rating.DoesNotExist:
                    pass

                response_data = {
                    'access_token': access_token,
                    'user_id': user.id,
                    'is_sharer': is_sharer,
                    'sharer_id': sharer_id,
                    'sharer_category': sharer.category if is_sharer else None,
                    'name': name,
                    'followed_sharers': list(followed_sharers),
                    'user_info': {
                        'email': user.email,
                        'username': user.username
                    },
                    'rating_id': rating_id,
                }


                return JsonResponse(response_data, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)



class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = [settings.APP_SCHEME, 'http', 'https']

class RequestPasswordResetEmail(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        email = request.data.get('email', '')

        User = get_user_model()  

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


class Be_sharer(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            if request.method == 'POST':
                page_name = request.data.get('page_name')
                profile_picture = request.data.get('profile_picture')  # Retrieve profile picture from request

                if page_name:
                    user = AppUser.objects.get(email=request.user.email)
                    if not user.is_sharer:  # Check if the user is not already a sharer
                        if not Sharer.objects.filter(name=page_name).exists():  # Check if the name already exists
                            user.is_sharer = True
                            user.save()

                            # Extract profile picture from AppUser
                            profile_picture = user.profile_picture

                            # Create Sharer instance with user's data including profile picture
                            sharer_instance_data = {
                                'user': user,
                                'email': user.email,  # You may need to adjust this depending on your serializer
                                'image': profile_picture,
                                'name': page_name,  # Set the sharer's name to the provided page_name
                                'description': f"Sharer profile for {page_name}",
                                'category': "Default Category",
                                'username': page_name  # Set the username to the page_name
                            }
                            sharer_instance = Sharer.objects.create(**sharer_instance_data)

                            user.sharer_id = sharer_instance.id
                            user.save()

                            response_data = {
                                'message': 'User is now a sharer',
                                'sharer_id': sharer_instance.id
                            }
                            return Response(response_data, status=status.HTTP_200_OK)
                        else:
                            return Response({'error': 'Name already exists'}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        return Response({'error': 'User is already a sharer'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'error': 'Missing page_name parameter'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except ObjectDoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'Internal Server Error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# CHECKING LANG IF is_sharer sa headers

class SharerChecker(APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            serializer = SharerCheckerSerializer({'is_sharer': user.is_sharer})
            return Response(serializer.data)
        else:
            return Response({'error': 'User is not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)



class FollowSharer(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        sharer_id = self.kwargs.get('sharer_id')
        try:
            sharer = Sharer.objects.get(pk=sharer_id)
            request.user.follows.add(sharer)
            request.user.save()

            serializer = SharerSerializer(sharer)

            return Response({'detail': 'Successfully followed sharer', 'sharer': serializer.data}, status=status.HTTP_200_OK)
        except Sharer.DoesNotExist:
            return Response({'detail': 'Sharer not found'}, status=status.HTTP_404_NOT_FOUND)


# Gawa ni Roque For UnFollow
class UnfollowSharer(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        sharer_id = self.kwargs.get('sharer_id')
        try:
            sharer = Sharer.objects.get(pk=sharer_id)
            request.user.follows.remove(sharer)
            request.user.save()

            serializer = SharerSerializer(sharer)

            return Response({'detail': 'Successfully unfollowed sharer', 'sharer': serializer.data}, status=status.HTTP_200_OK)
        except Sharer.DoesNotExist:
            return Response({'detail': 'Sharer not found'}, status=status.HTTP_404_NOT_FOUND)
        

class FollowedSharerList(generics.ListAPIView):
    serializer_class = SharerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.follows.all()
    

#PANG GET LAHAT NG USER

class UserView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)



# USE THIS FOR GET PROFILE
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object(), data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


# PANG EDIT


class ProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request, *args, **kwargs):
        # Check if the user is authenticated
        if request.user.is_sharer:
            return Response({"detail": "You are not allowed to access this endpoint."}, status=status.HTTP_403_FORBIDDEN)

        username = request.data.get('username')

        if not username:
            return Response({"detail": "Provide a username for update."}, status=status.HTTP_400_BAD_REQUEST)

        user_serializer = ProfileUpdateSerializer(request.user, data=request.data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({"user": user_serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid data provided for profile update."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data)
    if serializer.is_valid():
        user = request.user
        old_password = serializer.validated_data.get("old_password")
        new_password = serializer.validated_data.get("new_password")
        

        if not user.check_password(old_password):   
            return Response({"error": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        if old_password == new_password:
            return Response({"error": "New password must be different from old password"}, status=status.HTTP_400_BAD_REQUEST)
        

        user.set_password(new_password)
        user.save()
        return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



