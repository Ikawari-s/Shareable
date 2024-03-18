from rest_framework import serializers
from .models import *
from accounts.models import AppUser
from django.utils import timezone
from django.contrib.auth import get_user_model


class SharerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sharer
        fields = '__all__'


class SharerUploadListSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    edited_at_formatted = serializers.SerializerMethodField()
    edited = serializers.SerializerMethodField()  # Add edited field

    class Meta:
        model = SharerUpload
        fields = ['id', 'title', 'description', 'image', 'video', 'file', 'created_at', 'edited_at_formatted', 'edited']  # Include 'edited' field in the fields list

    def get_edited_at_formatted(self, instance):
        edited_at = instance.edited_at
        if edited_at:
            return timezone.localtime(edited_at).strftime('%Y-%m-%d %H:%M:%S')
        return None
 
    # Define method to determine edited status
    def get_edited(self, instance):
        return instance.edited_at is not None



class SharerUploadSerializer(serializers.ModelSerializer):
    created_at_formatted = serializers.SerializerMethodField()
    edited_at_formatted = serializers.SerializerMethodField()
    edited = serializers.SerializerMethodField()

    class Meta:
        model = SharerUpload
        fields = ['id', 'title', 'description', 'image', 'video', 'file', 'created_at', 'created_at_formatted', 'edited_at', 'edited_at_formatted', 'edited']

    def get_created_at_formatted(self, obj):
        return obj.created_at.strftime('%Y-%m-%d %H:%M:%S') if obj.created_at else None
    
    def get_edited_at_formatted(self, obj):
        return obj.edited_at.strftime('%Y-%m-%d %H:%M:%S') if obj.edited_at else None

    def get_edited(self, obj):
        return obj.edited_at is not None
    
    
    def create(self, validated_data):

        file_type = None
        if 'image' in validated_data:
            file_type = 'image'
        elif 'video' in validated_data:
            file_type = 'video'
        elif 'file' in validated_data:
            file_type = 'file'

        sharer_upload = SharerUpload.objects.create(**validated_data)

        if file_type == 'image':
            sharer_upload.image = validated_data.pop('image')
        elif file_type == 'video':
            sharer_upload.video = validated_data.pop('video')
        elif file_type == 'file':
            sharer_upload.file = validated_data.pop('file')

        sharer_upload.save()
        return sharer_upload



class SharerProfileSerializer(serializers.ModelSerializer):
    cover_photo = serializers.ImageField(source='user.profile_picture', read_only=True)

    class Meta:
        model = Sharer
        fields = ['id', 'email', 'image', 'username', 'name', 'category', 'cover_photo']



class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['user', 'post', 'liked']


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    profile_picture = serializers.ImageField(source='user.profile_picture', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'username', 'post', 'comments', 'created_at', 'profile_picture']

    def get_username(self, obj):
        return obj.user.username

    def create(self, validated_data):
        post = validated_data.pop('post')
        return Comment.objects.create(post=post, **validated_data)



class RatingSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    profile_picture = serializers.SerializerMethodField()
    user_rated = serializers.SerializerMethodField()  # New field
    already_rated = serializers.BooleanField(read_only=True)  # New field

    class Meta:
        model = Rating
        fields = ['id', 'sharer', 'user', 'rating', 'comment', 'username', 'profile_picture', 'user_rated', 'already_rated']

    def get_username(self, obj):
        return obj.user.username if obj.user else None

    def get_profile_picture(self, obj):
        user_id = obj.user_id
        user_instance = get_user_model().objects.filter(id=user_id).first()
        return user_instance.profile_picture.url if user_instance and user_instance.profile_picture else None

    def get_user_rated(self, obj):  # Method to determine if the user has rated the sharer
        user = self.context['user']
        return Rating.objects.filter(user=user, sharer=obj.sharer).exists()

