from rest_framework import serializers
from .models import *

class SharerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sharer
        fields = '__all__'


class SharerUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharerUpload
        fields = ['title', 'description', 'image' ]



class SharerUploadListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharerUpload
        fields = '__all__'