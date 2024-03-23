from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import *
from accounts.models import *
from .serializers import *
from rest_framework import status, generics, permissions
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model
from datetime import datetime
from decimal import Decimal
from django.db.models import Sum, DecimalField
from django.db.models.functions import Coalesce
import logging
from django.db import transaction
logger = logging.getLogger(__name__)

class IsSharerPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_sharer


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
    
    uploads = SharerUpload.objects.filter(uploaded_by=sharer).order_by('-created_at') 
    
    sharer_data = SharerProfileSerializer(sharer).data
    upload_data = SharerUploadSerializer(uploads, many=True, context={'request': request}).data
    
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
        serializer = SharerSerializer(user.sharer, many=False, context={'request': request})  
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def SharerUploadListView(request):
    queryset = SharerUpload.objects.filter(uploaded_by=request.user.sharer).order_by('-created_at')  
    serializer = SharerUploadListSerializer(queryset, many=True)
    return Response(serializer.data)


class SharerUploadViews(APIView):
    permission_classes = [IsAuthenticated, IsSharerPermission]

    def post(self, request):
        sharer = request.user.sharer

        serializer = SharerUploadSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save(uploaded_by=sharer)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SharerUploadViews(APIView):
    permission_classes = [IsAuthenticated, IsSharerPermission]

    def post(self, request):
        sharer = request.user.sharer

        serializer = SharerUploadSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save(uploaded_by=sharer)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PreviewContent(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, post_id):
        try:
            post = SharerUpload.objects.get(pk=post_id)
            sharer = post.uploaded_by
            current_user = request.user
            is_follower = current_user in sharer.followers.all()
            
            if is_follower or post.visibility == 'ALL':
                serializer = SharerUploadSerializer(post)
                return Response(serializer.data)
            else:
                return Response({"message": "No Preview Content"})
            
        except SharerUpload.DoesNotExist:
            return Response({"message": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        
class PreviewContentList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, sharer_id):
        try:
            sharer_content = SharerUpload.objects.filter(uploaded_by_id=sharer_id)
            
 
            sharer_content = sharer_content.filter(visibility='ALL')
            
  
            sharer_content = sharer_content.order_by('-created_at')
            
            serializer = SharerUploadSerializer(sharer_content, many=True)
            return Response(serializer.data)
            
        except SharerUpload.DoesNotExist:
            return Response({"message": "No content found for this sharer"}, status=status.HTTP_404_NOT_FOUND)



    
class SharerUploadEditView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, upload_id):
        try:
            upload = SharerUpload.objects.get(pk=upload_id)
        except SharerUpload.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if upload.uploaded_by != request.user.sharer:
            return Response({'error': 'You are not authorized to edit this post'}, status=status.HTTP_403_FORBIDDEN)

        if 'title' in request.data or 'description' in request.data or 'visibility' in request.data:
            serializer = SharerUploadSerializer(upload, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.validated_data['edited_at'] = timezone.now()
                serializer.validated_data['edited'] = True
                serializer.save()

                formatted_edited_at = format(upload.edited_at, 'Y-m-d H:i:s')

                response_data = {
                    'edited_at': upload.edited_at,
                    'edited_at_formatted': formatted_edited_at,
                    **serializer.data
                }

                return Response({'message': 'Edited', 'data': response_data})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'At least one of title, description, or visibility must be provided for editing'}, status=status.HTTP_400_BAD_REQUEST)


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
        
        serializer = CommentSerializer(data=request.data, context={'request': request, 'user': user, 'post': upload})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

class CommentDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        try:
            comment = Comment.objects.get(id=kwargs['comment_id'])
        except Comment.DoesNotExist:
            return Response({"message": "Comment does not exist"}, status=status.HTTP_404_NOT_FOUND)

        if comment.user.id != request.user.id: 
            return Response({"message": "You are not the owner of this comment"}, status=status.HTTP_403_FORBIDDEN)

        comment.delete()
        return Response({"message": "Comment deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    
    
    
class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer  
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        upload_id = self.kwargs.get('upload_id')
        queryset = Comment.objects.filter(post_id=upload_id).select_related('user') 
        return queryset


class IsSharer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_sharer


User = get_user_model()
class SharerUpdateProfile(APIView):
    permission_classes = [IsAuthenticated, IsSharer]

    def patch(self, request):
        user = request.user
        sharer = Sharer.objects.get(email=user.email) 

        request_data = request.data.copy()
        

        if 'email' in request_data:
            return Response({"detail": "You cannot update your email address."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = SharerSerializer(sharer, data=request_data, partial=True)

        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            if username:
                if User.objects.exclude(email=user.email).filter(username=username).exists():
                    return Response({"detail": "The username is already in use."}, status=status.HTTP_400_BAD_REQUEST)

                user.username = username
                user.save()

            if 'cover_photo' in request_data:
                cover_photo = request_data['cover_photo']
                sharer.cover_photo = cover_photo

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
    permission_classes = [IsAuthenticated]

    def get(self, request, sharer_id=None):  
        user = request.user

        if sharer_id is not None:
            try:
                sharer_id = int(sharer_id)
            except ValueError:
                return Response({"error": "Invalid Sharer ID"}, status=status.HTTP_400_BAD_REQUEST)

        followed_sharers = user.follows.all()
        if sharer_id is not None:
            ratings = Rating.objects.filter(sharer=sharer_id, rating__in=[i * 0.1 for i in range(1, 51)])  
        else:
            ratings = Rating.objects.filter(sharer__in=followed_sharers, rating__in=[i * 0.1 for i in range(1, 51)])  

        serialized_data = []
        for rating in ratings:
            serializer = RatingSerializer(rating, context={'user': user})
            serialized_data.append(serializer.data)

        return Response(serialized_data)

    def post(self, request, sharer_id):
        user = request.user
        try:
            sharer_id = int(sharer_id)
        except ValueError:
            return Response({"error": "Invalid Sharer ID"}, status=status.HTTP_400_BAD_REQUEST)
        
        already_rated = Rating.objects.filter(user=user, sharer_id=sharer_id).exists()  # Check if user has already rated
        if already_rated:
            return Response({"error": "You have already rated this sharer"}, status=status.HTTP_400_BAD_REQUEST)
        
        return self.handle_post(user, sharer_id, request.data)

    def handle_post(self, user, sharer_id, data):
        if not is_follow(user, sharer_id):
            return Response({"error": "You can only rate sharers you follow"}, status=status.HTTP_403_FORBIDDEN)

        if user.is_sharer and user.sharer.id == sharer_id:
            return Response({"error": "You cannot rate your own sharer"}, status=status.HTTP_403_FORBIDDEN)

        existing_rating = Rating.objects.filter(user=user, sharer_id=sharer_id).first()
        if existing_rating:
            return Response({"error": "You have already rated this sharer"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            rating = float(data.get('rating'))
        except ValueError:
            return Response({"error": "Invalid rating format"}, status=status.HTTP_400_BAD_REQUEST)

        if rating <= 0:
            return Response({"error": "Rating must be greater than zero"}, status=status.HTTP_400_BAD_REQUEST)

        data_copy = data.copy()
        data_copy['rating'] = round(rating, 1)  
        serializer = RatingSerializer(data=data_copy, context={'user': user})
        if serializer.is_valid():
            serializer.save(user=user, sharer_id=sharer_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteRating(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, rating_id):
        try:
            rating = Rating.objects.get(pk=rating_id)
        except Rating.DoesNotExist:
            return Response({"error": "Rating not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if the authenticated user is the owner of the rating
        if request.user == rating.user:
            if not is_follow(request.user, rating.sharer_id):
                return Response({"error": "You can only delete ratings for sharers you follow"}, status=status.HTTP_403_FORBIDDEN)
            rating.delete()
            return Response({"message": "Rating deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "You are not authorized to delete this rating"}, status=status.HTTP_403_FORBIDDEN)
        

class RatingUpdateView(APIView):
    def patch(self, request, rating_id):
        user = request.user
        try:
            rating_id = int(rating_id)
        except ValueError:
            return Response({"error": "Invalid Rating ID"}, status=status.HTTP_400_BAD_REQUEST)

        existing_rating = get_object_or_404(Rating, id=rating_id, user=user)

        try:
            rating = float(request.data.get('rating'))
        except ValueError:
            return Response({"error": "Invalid rating format"}, status=status.HTTP_400_BAD_REQUEST)

        if rating <= 0:
            return Response({"error": "Rating must be greater than zero"}, status=status.HTTP_400_BAD_REQUEST)

        comment = request.data.get('comment', existing_rating.comment)

        data = {'rating': round(rating, 1), 'comment': comment}

        if not is_follow(request.user, existing_rating.sharer_id):
            return Response({"error": "You can only update ratings for sharers you follow"}, status=status.HTTP_403_FORBIDDEN)

        serializer = RatingSerializer(existing_rating, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PostCount(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, sharer_id):
 
        try:
            sharer_id = int(sharer_id)
        except ValueError:
            return Response({"error": "Invalid Sharer ID"}, status=status.HTTP_400_BAD_REQUEST)


        post_count = SharerUpload.objects.filter(uploaded_by_id=sharer_id).count()

        return Response({"post_count": post_count}, status=status.HTTP_200_OK)
    

class DashboardRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = DashboardSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):

        try:
            return Dashboard.objects.get(sharer=self.request.user.sharer)
        except Dashboard.DoesNotExist:

            return Dashboard.objects.create(sharer=self.request.user.sharer)

    def perform_update(self, serializer):

        serializer.save(sharer=self.request.user.sharer)




class TipBoxCreateView(generics.CreateAPIView):
    queryset = TipBox.objects.all()
    serializer_class = TipBoxCreateSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        try:
            mutable_data = request.data.copy()
            mutable_data['sharer'] = kwargs.get('sharer_id')

            serializer = self.get_serializer(data=mutable_data)
            serializer.is_valid(raise_exception=True)

            tip_amount = serializer.validated_data.get('amount')
            sharer = serializer.validated_data.get('sharer')

            dashboard, created = Dashboard.objects.get_or_create(sharer=sharer)
            dashboard.total_earnings += Decimal(str(tip_amount))  # Ensure tip_amount is converted to Decimal
            dashboard.save()

            serializer.save(user=self.request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error processing TipBox creation: {e}")
            return Response({"error": "An error occurred while processing the request."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class TopDonorView(APIView):
    def get(self, request, sharer_id):
        top_donor = get_top_donors(sharer_id)
        if top_donor:
            return Response(top_donor, status=200)
        else:
            return Response({'error': 'Sharer not found or no donations exist for this sharer.'}, status=404)
        
def get_top_donors(sharer_id):
    try:
        sharer = Sharer.objects.get(id=sharer_id)
        top_donors = TipBox.objects.filter(sharer=sharer).values('user').annotate(
            total_amount=Coalesce(Sum('amount'), 0, output_field=DecimalField())
        ).order_by('-total_amount')[:3] 
        
        top_donors_list = []
        
        for donor in top_donors:
            user_id = donor['user']
            total_amount = donor['total_amount']
            user = User.objects.get(id=user_id)  # Fetch the user object
            username = user.username  # Get the username associated with the user ID
            profile_picture = user.profile_picture.url if user.profile_picture else None
            top_donors_list.append({
                'user_id': user_id,
                'username': username,
                'profile_picture': profile_picture,  
                'total_amount': total_amount
            })
        
        return top_donors_list
    except Sharer.DoesNotExist:
        return None
