from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework.exceptions import AuthenticationFailed
from .models import *
from django.db.models import Sum, DecimalField
from sharer.models import TipBox
from django.db.models.functions import Coalesce

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, validated_data):
        user_obj = UserModel.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user_obj

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only = True)

    def validate(self, attrs):
        user = authenticate(username=attrs['email'], password=attrs['password'])
        if not user:
            raise ValidationError('User not found or incorrect password')
        return attrs

class UserSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.SerializerMethodField()
    badge = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = ['id', 'email', 'username', 'is_active', 'is_staff', 'profile_picture', 'profile_picture_url', 'badge']

    def get_profile_picture_url(self, obj):
        if obj.profile_picture:
            return obj.profile_picture.url
        return None
    
    def get_badge(self, obj):
        try:
            top_donor = TipBox.objects.filter(user=obj).order_by('-amount').first()
            if top_donor:
                top_donors = TipBox.objects.filter(sharer=top_donor.sharer).values('user').annotate(
                    total_amount=Coalesce(Sum('amount'), 0, output_field=DecimalField())
                ).order_by('-total_amount')[:3]

                top_donor_ids = [donor['user'] for donor in top_donors]

                if obj.id == top_donor_ids[0]:
                    return 'Gold'
                elif obj.id == top_donor_ids[1]:
                    return 'Silver'
                elif obj.id == top_donor_ids[2]:
                    return 'Bronze'
            return 'None'
        except:
            return 'None'

class ProfileUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = AppUser
        fields = ['username', 'profile_picture']

    def update(self, instance, validated_data):
        if 'username' in validated_data:
            instance.username = validated_data['username']
        if 'profile_picture' in validated_data:
            instance.profile_picture = validated_data['profile_picture']
        instance.save()
        return instance


class Be_sharerSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100) 


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserModel
        fields = ['id', 'email', 'username', 'is_active', 'is_staff', 'token', 'is_sharer']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']



class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=8, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = AppUser.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            if user.check_password(password):
                raise serializers.ValidationError("New password cannot be the same as the old password.")

            user.set_password(password)
            user.save()

            return attrs
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)


class SendOTPSerializer(serializers.Serializer):    
    email = serializers.EmailField()

class ResendOTPSerializer(serializers.Serializer):
    user_id = serializers.IntegerField() 

class VerifyOTPSerializer(serializers.Serializer):
    user_id = serializers.IntegerField() 
    otp = serializers.CharField(max_length=6)
    otp_id = serializers.CharField() 




class SharerCheckerSerializer(serializers.Serializer):
    is_sharer = serializers.BooleanField()



class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(min_length=8, required=True)
    new_password = serializers.CharField(min_length=8, required=True)

