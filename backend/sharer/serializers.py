from rest_framework import serializers
from .models import Sharer

class SharerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sharer
        fields = '__all__'