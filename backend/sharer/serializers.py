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
        fields = ['id','title', 'description', 'image', 'created_at']


class SharerUploadSerializer(serializers.ModelSerializer):
    created_at_formatted = serializers.SerializerMethodField()

    class Meta:
        model = SharerUpload
        fields = ['id', 'title', 'description', 'image', 'created_at', 'created_at_formatted'] 

    def get_created_at_formatted(self, obj):
        return obj.created_at.strftime('%Y-%m-%d %H:%M:%S') if obj.created_at else None

class SharerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sharer
        fields = ['id', 'email']



class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['user', 'post', 'liked']



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'comments', 'username']
