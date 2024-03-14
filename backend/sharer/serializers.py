from rest_framework import serializers
from .models import *

class SharerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sharer
        fields = '__all__'


class SharerUploadListSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = SharerUpload
        fields = ['id', 'title', 'description', 'image', 'video', 'file', 'created_at']



class SharerUploadSerializer(serializers.ModelSerializer):
    created_at_formatted = serializers.SerializerMethodField()
    
    class Meta:
        model = SharerUpload
        fields = ['id', 'title', 'description', 'image', 'video', 'file', 'created_at', 'created_at_formatted']

    def get_created_at_formatted(self, obj):
        return obj.created_at.strftime('%Y-%m-%d %H:%M:%S') if obj.created_at else None

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
    class Meta:
        model = Comment
        fields = ['id', 'comments', 'username']


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'sharer', 'user', 'rating', 'comment']