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

AppUser = get_user_model()  # Get the custom user model


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

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
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        print(request.auth)  
        try:
            user_serializer = UserSerializer(request.user)
            user_data = user_serializer.data

            refresh = RefreshToken.for_user(request.user)
            access_token = str(refresh.access_token)

            
            print(f'Access Token: {access_token}')

            response_data = {'user': user_data, 'access_token': access_token}
            return JsonResponse(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({'detail': f'Error retrieving user information: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


