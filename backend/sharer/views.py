from django.shortcuts import render
from .models import Sharer
from .serializers import SharerSerializer
from rest_framework import viewsets

# Create your views here.
class SharerView(viewsets.ModelViewSet):
    queryset = Sharer.objects.all()
    serializer_class = SharerSerializer