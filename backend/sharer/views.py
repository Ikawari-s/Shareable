from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import *
from .serializers import *
from rest_framework import status, generics, permissions
from django.shortcuts import get_object_or_404
from django.db import IntegrityError


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
        
        # Create a serializer with the request data
        serializer = SharerUploadSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(uploaded_by=sharer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikePost(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, upload_id):
        user = request.user
        upload = get_object_or_404(SharerUpload, id=upload_id)
        
        try:
            like = Like.objects.get(user=user, post=upload)
            if like.liked:
                like.delete()
                return Response({"message": "Post like removed successfully"}, status=status.HTTP_200_OK)
            else:
                like.liked = True
                like.unliked = False
                like.save()
                return Response({"message": "Post liked successfully"}, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            Like.objects.create(user=user, post=upload, liked=True)
            return Response({"message": "Post liked successfully"}, status=status.HTTP_201_CREATED)


class UnlikePost(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, upload_id):
        user = request.user
        upload = get_object_or_404(SharerUpload, id=upload_id)

        try:
            like = Like.objects.get(user=user, post=upload)
            if like.unliked:
                like.delete()
                return Response({"message": "Post unlike removed successfully"}, status=status.HTTP_200_OK)
            else:
                like.unliked = True
                like.liked = False
                like.save()
                return Response({"message": "Post unliked successfully"}, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            Like.objects.create(user=user, post=upload, liked=False, unliked=True)
            return Response({"message": "Post unliked successfully"}, status=status.HTTP_201_CREATED)



class CountOfLikes(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, upload_id):
        upload = get_object_or_404(SharerUpload, id=upload_id)
        likes_count = Like.objects.filter(post=upload, liked=True).count()
        unlikes_count = Like.objects.filter(post=upload, unliked=True).count()
        return Response({"likes_count": likes_count, "unlikes_count": unlikes_count}, status=status.HTTP_200_OK)


class CommentPost(APIView):
    permission_classes = [IsAuthenticated]  

    def post(self, request, upload_id):
        user = request.user
        try:
            upload = SharerUpload.objects.get(id=upload_id)
        except SharerUpload.DoesNotExist:
            return Response({"message": "Post does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user, post=upload)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CommentDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        try:
            comment = Comment.objects.get(id=kwargs['comment_id'])
        except Comment.DoesNotExist:
            return Response({"message": "Comment does not exist"}, status=status.HTTP_404_NOT_FOUND)

    
        if comment.user != request.user:
            return Response({"message": "You are not the owner of this comment"}, status=status.HTTP_403_FORBIDDEN)

        comment.delete()
        return Response({"message": "Comment deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
    
    
class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer  
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        upload_id = self.kwargs.get('upload_id')
        queryset = Comment.objects.filter(post_id=upload_id)  
        return queryset
    


class IsSharer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_sharer






class SharerUpdateProfile(APIView):
    permission_classes = [IsAuthenticated, IsSharer]

    def patch(self, request):
        user = request.user
        sharer = Sharer.objects.get(user=user)
        serializer = SharerSerializer(sharer, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class SharerDeletePostView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated, IsSharerPermission]

    def delete(self, request, *args, **kwargs):
        upload_id = kwargs.get('upload_id')

        try:
            upload = SharerUpload.objects.get(id=upload_id)
        except SharerUpload.DoesNotExist:
            return Response({"message": "Post does not exist"}, status=status.HTTP_404_NOT_FOUND)

        if upload.uploaded_by.user != request.user:
            return Response({"message": "You are not the owner of this post"}, status=status.HTTP_403_FORBIDDEN)

        upload.delete()
        return Response({"message": "Post deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    

def is_follow(user, sharer_id):
    """
    Check if the user follows the specified sharer.
    """
    try:
        sharer = Sharer.objects.get(pk=sharer_id)
    except Sharer.DoesNotExist:
        return False
    return sharer in user.follows.all()


class RatingViews(APIView):
    def get(self, request, sharer_id=None):  
        user = request.user
        if user.is_authenticated:
            if sharer_id is not None:
                try:
                    sharer_id = int(sharer_id)
                except ValueError:
                    return Response({"error": "Invalid Sharer ID"}, status=status.HTTP_400_BAD_REQUEST)

            followed_sharers = user.follows.all()
            if sharer_id is not None:
                ratings = Rating.objects.filter(sharer=sharer_id, rating__in=[i * 0.5 for i in range(11)])
            else:
                ratings = Rating.objects.filter(sharer__in=followed_sharers, rating__in=[i * 0.5 for i in range(11)])
            serializer = RatingSerializer(ratings, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    
    def post(self, request, sharer_id):
        user = request.user
        if user.is_authenticated:
            try:
                sharer_id = int(sharer_id)
            except ValueError:
                return Response({"error": "Invalid Sharer ID"}, status=status.HTTP_400_BAD_REQUEST)
            
            return self.handle_post(user, sharer_id, request.data)
        else:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
    
    def handle_post(self, user, sharer_id, data):
        if user.is_sharer and user.sharer.id == sharer_id:
            return Response({"error": "You cannot rate your own sharer"}, status=status.HTTP_403_FORBIDDEN)

        if is_follow(user, sharer_id):
            try:
                rating = float(data['rating'])  # Convert rating to a float
            except ValueError:
                return Response({"error": "Invalid rating format"}, status=status.HTTP_400_BAD_REQUEST)

            if rating < 0:
                return Response({"error": "Rating cannot be negative"}, status=status.HTTP_400_BAD_REQUEST)

            data['rating'] = round(rating * 2) / 2
            serializer = RatingSerializer(data=data)
            if serializer.is_valid():
                serializer.save(user=user, sharer_id=sharer_id)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "You can only rate sharers you follow"}, status=status.HTTP_403_FORBIDDEN)