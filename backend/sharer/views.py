from django.shortcuts import render
from .models import Sharer
from .serializers import *
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
# class SharerView(viewsets.ModelViewSet):
#     queryset = Sharer.objects.all()
#     serializer_class = SharerSerializer


@api_view(['GET'])
def SharerView(request):
    queryset = Sharer.objects.all()
    serializer = SharerSerializer(queryset, many=True)
    return Response(serializer.data)


