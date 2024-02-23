from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import *
from .serializers import *
from rest_framework import status, generics, permissions


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def SharerView(request):
    queryset = Sharer.objects.all()
    serializer = SharerSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def SharerlatestPost(request, sharer_id):  
    try:
        sharer = Sharer.objects.get(pk=sharer_id)
    except Sharer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

    uploads = SharerUpload.objects.filter(uploaded_by=sharer).order_by('created_at')
    
    sharer_data = SharerProfileSerializer(sharer).data
    upload_data = SharerUploadSerializer(uploads, many=True).data
    
    sharer_data['uploads'] = upload_data
    
    return Response(sharer_data)



class SharerProfileDetail(generics.RetrieveAPIView):
    queryset = Sharer.objects.all()
    serializer_class = SharerSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        sharer_id = self.kwargs.get('sharer_id')
        try:
            return Sharer.objects.get(id=sharer_id)
        except Sharer.DoesNotExist:
            return None

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response({"detail": "Sharer profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class UserSharerProfile(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = SharerProfileSerializer(user.sharer, many=False)  
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def SharerUploadListView(request):
    queryset = SharerUpload.objects.filter(uploaded_by=request.user.sharer).order_by('-created_at')  
    serializer = SharerUploadListSerializer(queryset, many=True)
    return Response(serializer.data)


class IsSharerPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_sharer


class SharerUploadViews(APIView):
    permission_classes = [IsAuthenticated, IsSharerPermission]

    def post(self, request):
        sharer = request.user.sharer  
        request.data['uploaded_by'] = sharer.id

        serializer = SharerUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(uploaded_by=sharer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
