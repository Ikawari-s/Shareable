from rest_framework import serializers
from .models import *
from accounts.models import AppUser
from django.utils import timezone


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
    class Meta:
        model = Sharer
        fields = ['id', 'email', 'image', 'username', 'name']



class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['user', 'post', 'liked']


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id','user', 'username', 'post', 'comments']

    def get_username(self, obj):
        user_id = obj.user_id
        try:
            user = AppUser.objects.get(id=user_id)
            return user.username
        except AppUser.DoesNotExist:
            return None

    def create(self, validated_data):
        post = validated_data.pop('post')
        return Comment.objects.create(post=post, **validated_data)




class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'sharer', 'user', 'rating', 'comment']