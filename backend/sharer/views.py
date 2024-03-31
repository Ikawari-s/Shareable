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
from .permission import *
import logging
from django.db import transaction
import json
logger = logging.getLogger(__name__)

User = get_user_model()


# ISAUTH
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def SharerView(request):
    queryset = Sharer.objects.all()
    serializer = SharerSerializer(queryset, many=True)
    return Response(serializer.data)

#IS FOLLOW // okay
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def SharerlatestPost(request, sharer_id):  
    try:
        sharer = Sharer.objects.get(pk=sharer_id)
    except Sharer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    user = request.user
    if not is_follow(user, sharer_id):
        return Response({"detail": "You are not following this sharer."}, status=status.HTTP_403_FORBIDDEN)
    
    uploads = SharerUpload.objects.filter(uploaded_by=sharer).order_by('-created_at') 
    
    sharer_data = SharerProfileSerializer(sharer).data
    upload_data = SharerUploadSerializer(uploads, many=True, context={'request': request}).data
    
    sharer_data['uploads'] = upload_data
    
    return Response(sharer_data)

class Tier1FollowedSharers(generics.ListAPIView):
    serializer_class = SharerUploadListSerializer
    permission_classes = [IsAuthenticated]
    tier = 'tier1'

    def get_queryset(self):
        user = self.request.user
        sharer_id = self.kwargs.get('sharer_id')
        tier = self.tier
        visibility_tier = f'FOLLOWERS_{tier.upper()}'

        queryset = SharerUpload.objects.filter(visibility__contains=visibility_tier)

        if sharer_id:
            if is_follow(user, sharer_id, tier):
                queryset = queryset.filter(uploaded_by_id=sharer_id)
            else:
                queryset = SharerUpload.objects.none()
        else:
            user_follows = getattr(user, f'follows_{tier}').all()
            queryset = queryset.filter(uploaded_by__in=user_follows)

        queryset = queryset.order_by('-created_at')

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        if not queryset.exists():
            if is_follow(request.user, kwargs.get('sharer_id'), self.tier):
                message = f"No posts yet from this sharer in {self.tier.capitalize()} tier."
                return Response({"message": message}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"detail": "You are not followed in this tier."}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class Tier2FollowedSharers(generics.ListAPIView):
    serializer_class = SharerUploadListSerializer
    permission_classes = [IsAuthenticated]
    tier = 'tier2'

    def get_queryset(self):
        user = self.request.user
        sharer_id = self.kwargs.get('sharer_id')
        tier = self.tier
        visibility_tier = f'FOLLOWERS_{tier.upper()}'

        queryset = SharerUpload.objects.filter(visibility__contains=visibility_tier)

        if sharer_id:
            if is_follow(user, sharer_id, tier):
                queryset = queryset.filter(uploaded_by_id=sharer_id)
            else:
                queryset = SharerUpload.objects.none()
        else:
            user_follows = getattr(user, f'follows_{tier}').all()
            queryset = queryset.filter(uploaded_by__in=user_follows)

        queryset = queryset.order_by('-created_at')

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        if not queryset.exists():
            if is_follow(request.user, kwargs.get('sharer_id'), self.tier):
                message = f"No posts yet from this sharer in {self.tier.capitalize()} tier."
                return Response({"message": message}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"detail": "You are not followed in this tier."}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class Tier3FollowedSharers(generics.ListAPIView):
    serializer_class = SharerUploadListSerializer
    permission_classes = [IsAuthenticated]
    tier = 'tier3'

    def get_queryset(self):
        user = self.request.user
        sharer_id = self.kwargs.get('sharer_id')
        tier = self.tier
        visibility_tier = f'FOLLOWERS_{tier.upper()}'

        queryset = SharerUpload.objects.filter(visibility__contains=visibility_tier)

        if sharer_id:
            if is_follow(user, sharer_id, tier):
                queryset = queryset.filter(uploaded_by_id=sharer_id)
            else:
                queryset = SharerUpload.objects.none()
        else:
            user_follows = getattr(user, f'follows_{tier}').all()
            queryset = queryset.filter(uploaded_by__in=user_follows)

        queryset = queryset.order_by('-created_at')

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        if not queryset.exists():
            if is_follow(request.user, kwargs.get('sharer_id'), self.tier):
                message = f"No posts yet from this sharer in {self.tier.capitalize()} tier."
                return Response({"message": message}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"detail": "You are not followed in this tier."}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# isAuth, para to sa detail view which can be access basta login ka lang
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

#IS SHARER // okay
class UserSharerProfile(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (permissions.IsAuthenticated, IsSharerPermission)

    def get(self, request):
        user = request.user
        serializer = SharerSerializer(user.sharer, many=False, context={'request': request})  
        return Response(serializer.data)

#IS SHARER // okay
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsSharerPermission]) 
def SharerUploadListView(request):
    queryset = SharerUpload.objects.filter(uploaded_by=request.user.sharer).order_by('-created_at')
    serializer = SharerUploadListSerializer(queryset, many=True)
    return Response(serializer.data)

#IS SHARER // okay
class SharerUploadViews(APIView):
    permission_classes = [IsAuthenticated, IsSharerPermission]

    def post(self, request):
        sharer = request.user.sharer

        serializer = SharerUploadSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save(uploaded_by=sharer)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




#NOT NEEDED BUT DO NOT REMOVE
# class PreviewContent(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request, post_id):
#         try:
#             post = SharerUpload.objects.get(pk=post_id)
#             sharer = post.uploaded_by
#             current_user = request.user
#             is_follower = current_user in sharer.followers.all()
            
#             if is_follower or post.visibility == 'ALL':
#                 serializer = SharerUploadSerializer(post)
#                 return Response(serializer.data)
#             else:
#                 return Response({"message": "No Preview Content"})
            
#         except SharerUpload.DoesNotExist:
#             return Response({"message": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        

#IS AUTH 

class PreviewContentList(APIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        sharer_id = self.kwargs.get('sharer_id')
        visibility_tier = 'NON_FOLLOWER'
        
        queryset = SharerUpload.objects.all()
        if sharer_id:
            queryset = queryset.filter(uploaded_by_id=sharer_id)
        
        # Filter by visibility, checking if NON_FOLLOWER is present in the list
        queryset = queryset.filter(visibility__contains=visibility_tier)
        
        queryset = queryset.order_by('-created_at')
        return queryset

    def get(self, request, sharer_id):
        try:
            queryset = self.get_queryset()
            serializer = SharerUploadListSerializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#IS SHARER // okay
class SharerUploadEditView(APIView):
    permission_classes = [IsAuthenticated, IsSharerPermission]

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
            if username is not None:  # Check if username is provided
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
    

class PostCount(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, sharer_id):
        try:
            sharer_id = int(sharer_id)
        except ValueError:
            return Response({"error": "Invalid Sharer ID"}, status=status.HTTP_400_BAD_REQUEST)

        # Total post count
        total_post_count = SharerUpload.objects.filter(uploaded_by_id=sharer_id).count()

        # Dictionary to store post counts per tier
        post_counts = {}

        # Iterate over visibility tiers
        for tier in ['tier1', 'tier2', 'tier3']:
            visibility_tier = f'FOLLOWERS_{tier.upper()}'
            post_count = SharerUpload.objects.filter(uploaded_by_id=sharer_id, visibility__contains=visibility_tier).count()
            post_counts[tier] = post_count

        response_data = {
            "post_count": total_post_count,
            "post_counts_per_tier": post_counts
        }

        return Response(response_data, status=status.HTTP_200_OK)
    
#IS SHARER // okay
class DashboardRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = DashboardSerializer
    permission_classes = [IsAuthenticated, IsSharerPermission]

    def get_object(self):
        try:
            return Dashboard.objects.get(sharer=self.request.user.sharer)
        except Dashboard.DoesNotExist:
            return Dashboard.objects.create(sharer=self.request.user.sharer)

    def perform_update(self, serializer):
        serializer.save(sharer=self.request.user.sharer)


#IS AUTH ONLY
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
            dashboard.total_earnings += Decimal(str(tip_amount))
            
            # Calculate twenty percent
            twenty_percent = Decimal('0.20')
            twenty_percent_earnings = Decimal(str(tip_amount)) * twenty_percent
            dashboard.twenty_percent_less_earning_send = dashboard.total_earnings - twenty_percent_earnings
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
            user = User.objects.get(id=user_id) 
            username = user.username  
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
    
    




#IS FOLLOW

class RatingViews(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, sharer_id=None):  
        user = request.user

        if sharer_id is not None:
            try:
                sharer_id = int(sharer_id)
            except ValueError:
                return Response({"error": "Invalid Sharer ID"}, status=status.HTTP_400_BAD_REQUEST)

        if sharer_id is not None:
            ratings = Rating.objects.filter(sharer=sharer_id, rating__in=[i * 0.1 for i in range(1, 51)])  
        else:
            ratings = Rating.objects.filter(rating__in=[i * 0.1 for i in range(1, 51)])  

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
            
            if not (user.follows_tier1.filter(id=sharer_id).exists() or
                    user.follows_tier2.filter(id=sharer_id).exists() or
                    user.follows_tier3.filter(id=sharer_id).exists()):
                return Response({"error": "You can only rate sharers you follow"}, status=status.HTTP_403_FORBIDDEN)

            sharer = Sharer.objects.get(pk=sharer_id)


            if user.is_sharer and user.sharer.id == sharer_id:
                print( user.is_sharer and user.sharer.id)
                print(sharer_id)
                return Response({"error": "You cannot rate yourself"}, status=status.HTTP_400_BAD_REQUEST)

            existing_rating = Rating.objects.filter(user=user, sharer_id=sharer_id).first()
            if existing_rating:
                return Response({"error": "You have already rated this sharer"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                rating = float(request.data.get('rating'))
            except ValueError:
                return Response({"error": "Invalid rating format"}, status=status.HTTP_400_BAD_REQUEST)

            if rating <= 0:
                return Response({"error": "Rating must be greater than zero"}, status=status.HTTP_400_BAD_REQUEST)

            rating = min(rating, 5.0)

            data = request.data.copy()
            data['rating'] = round(rating, 1)  
            serializer = RatingSerializer(data=data, context={'user': user})
            if serializer.is_valid():
                serializer.save(user=user, sharer_id=sharer_id)
                print( user.is_sharer and user.sharer.id)
                print(sharer_id)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

#IS FOLLOW // okay
class DeleteRating(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, rating_id):
        try:
            rating = Rating.objects.get(pk=rating_id)
        except Rating.DoesNotExist:
            return Response({"error": "Rating not found"}, status=status.HTTP_404_NOT_FOUND)

        if request.user == rating.user:
            if not (request.user.follows_tier1.filter(id=rating.sharer_id).exists() or
                    request.user.follows_tier2.filter(id=rating.sharer_id).exists() or
                    request.user.follows_tier3.filter(id=rating.sharer_id).exists()):
                return Response({"error": "You can only delete ratings for sharers you follow"}, status=status.HTTP_403_FORBIDDEN)
            rating.delete()
            return Response({"message": "Rating deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "You are not authorized to delete this rating"}, status=status.HTTP_403_FORBIDDEN)
        
#IS FOLLOW // okay
class RatingUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, rating_id):
        user = request.user

        try:
            rating_id = int(rating_id)
        except ValueError:
            return Response({"error": "Invalid Rating ID"}, status=status.HTTP_400_BAD_REQUEST)

        existing_rating = get_object_or_404(Rating, id=rating_id)

        if not (user.follows_tier1.filter(id=existing_rating.sharer_id).exists() or
                user.follows_tier2.filter(id=existing_rating.sharer_id).exists() or
                user.follows_tier3.filter(id=existing_rating.sharer_id).exists()):
            return Response({"error": "You can only update ratings for sharers you follow"}, status=status.HTTP_403_FORBIDDEN)

        if existing_rating.user != user:
            return Response({"error": "You can only update your own ratings"}, status=status.HTTP_403_FORBIDDEN)

        try:
            rating = float(request.data.get('rating'))
        except ValueError:
            return Response({"error": "Invalid rating format"}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure rating is between 0 and 5
        if rating <= 0:
            return Response({"error": "Rating must be greater than zero"}, status=status.HTTP_400_BAD_REQUEST)
        elif rating > 5:
            rating = 5

        comment = request.data.get('comment', existing_rating.comment)

        data = {'rating': round(rating, 1), 'comment': comment}

        serializer = RatingSerializer(existing_rating, data=data, partial=True, context={'user': user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LikePost(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, upload_id):
        app_user = request.user
        upload = get_object_or_404(SharerUpload, id=upload_id)
        
        try:
            sharer_instance = app_user.sharer
        except Sharer.DoesNotExist:
            sharer_instance = None
        
        
        if sharer_instance == upload.uploaded_by:
            print("User is the uploader. Allowing like.")
            return self.handle_like(app_user, upload)
        
        user_tiers = self.get_user_tiers(app_user, upload)
        post_visibility = self.get_post_visibility(upload)
        print(user_tiers)
        print(post_visibility)

        
        if self.check_visibility_match(post_visibility, user_tiers) or sharer_instance == upload.uploaded_by:
            return self.handle_like(app_user, upload)
        else:
            print("Visibility check failed. User cannot like the post.")
            return Response({"error": "You can only like posts with visibility matching your followed tiers or if you are the uploader"}, status=status.HTTP_403_FORBIDDEN)

    def handle_like(self, user, upload):
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


    def get_user_tiers(self, user, upload):
        user_tiers = []
        if isinstance(upload, SharerUpload):
            try:
                sharer_instance = upload.uploaded_by
                if user.follows_tier1.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER1")
                if user.follows_tier2.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER2")
                if user.follows_tier3.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER3")
            except Sharer.DoesNotExist:
                pass
        return user_tiers


    def get_post_visibility(self, upload):
        visibility = upload.visibility
        try:
            visibility_list = json.loads(visibility)
            if isinstance(visibility_list, list):
                return visibility_list
        except (json.JSONDecodeError, TypeError):
            if ',' in visibility:
                visibility_list = [tier.strip() for tier in visibility.split(',')]
            else:
                visibility_list = [visibility.strip()]
            return visibility_list
        return []

    def check_visibility_match(self, post_visibility, user_tiers):
        if post_visibility:
            for tier in post_visibility:
                if tier in user_tiers:
                    return True
        return False
    
class UnlikePost(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, upload_id):
        user = request.user
        upload = get_object_or_404(SharerUpload, id=upload_id)
        
        try:
            sharer_instance = user.sharer
        except Sharer.DoesNotExist:
            sharer_instance = None
        
        if sharer_instance == upload.uploaded_by:
            print("User is the uploader. Allowing unlike.")
            return self.handle_unlike(user, upload)
        
        user_tiers = self.get_user_tiers(user, upload)  # Corrected variable name
        post_visibility = self.get_post_visibility(upload)
        print(user_tiers)
        print(post_visibility)

        if self.check_visibility_match(post_visibility, user_tiers) or user == upload.uploaded_by:
            return self.handle_unlike(user, upload)
        else:
            return Response({"error": "You can only unlike posts with visibility matching your followed tiers or if you are the uploader"}, status=status.HTTP_403_FORBIDDEN)

    def handle_unlike(self, user, upload):
        try:
            like = Like.objects.get(user=user, post=upload)
            if like.unliked:
                like.delete()
                print(f"Post unlike removed successfully by {user}")
                return Response({"message": "Post unlike removed successfully"}, status=status.HTTP_200_OK)
            else:
                like.unliked = True
                like.liked = False
                like.save()
                print(f"Post unliked successfully by {user}")
                return Response({"message": "Post unliked successfully"}, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            Like.objects.create(user=user, post=upload, liked=False, unliked=True)
            print(f"Post unliked successfully by {user}")
            return Response({"message": "Post unliked successfully"}, status=status.HTTP_201_CREATED)
        
    def get_user_tiers(self, user, upload):
        user_tiers = []
        if isinstance(upload, SharerUpload):
            try:
                sharer_instance = upload.uploaded_by
                if user.follows_tier1.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER1")
                if user.follows_tier2.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER2")
                if user.follows_tier3.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER3")
            except Sharer.DoesNotExist:
                pass
        return user_tiers


    def get_post_visibility(self, upload):
        visibility = upload.visibility
        try:
            visibility_list = json.loads(visibility)
            if isinstance(visibility_list, list):
                return visibility_list
        except (json.JSONDecodeError, TypeError):
            if ',' in visibility:
                visibility_list = [tier.strip() for tier in visibility.split(',')]
            else:
                visibility_list = [visibility.strip()]
            return visibility_list
        return []

    def check_visibility_match(self, post_visibility, user_tiers):
        if post_visibility:
            for tier in post_visibility:
                if tier in user_tiers:
                    return True
        return False



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
        app_user = request.user
        upload = get_object_or_404(SharerUpload, id=upload_id)
        
        # Check if the user has a related sharer instance
        try:
            sharer_instance = app_user.sharer
        except Sharer.DoesNotExist:
            sharer_instance = None

        if sharer_instance == upload.uploaded_by:
            print("User is the uploader. Allowing comment.")
            return self.handle_comment(app_user, upload, request)
        
        user_tiers = self.get_user_tiers(app_user, upload)
        post_visibility = self.get_post_visibility(upload)
        print(user_tiers)
        print(post_visibility)

        if self.check_visibility_match(post_visibility, user_tiers) or app_user == upload.uploaded_by:
            return self.handle_comment(app_user, upload, request)
        else:
            print("Visibility check failed. User cannot comment on the post.")
            return Response({"error": "You can only comment on posts with visibility matching your followed tiers or posts of users you follow"}, status=status.HTTP_403_FORBIDDEN)

    def can_comment(self, user, upload):
        user_tiers = self.get_user_tiers(user)
        post_visibility = self.get_post_visibility(upload)
        
        if not self.check_visibility_match(post_visibility, user_tiers) and user != upload.uploaded_by:
            return False
        

        return user.follows_tier1.filter(id=upload.uploaded_by.id).exists() or \
            user.follows_tier2.filter(id=upload.uploaded_by.id).exists() or \
            user.follows_tier3.filter(id=upload.uploaded_by.id).exists()


    def get_user_tiers(self, user, upload):
        user_tiers = []
        if isinstance(upload, SharerUpload):
            try:
                sharer_instance = upload.uploaded_by
                if user.follows_tier1.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER1")
                if user.follows_tier2.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER2")
                if user.follows_tier3.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER3")
            except Sharer.DoesNotExist:
                pass
        return user_tiers


    def get_post_visibility(self, upload):
        visibility = upload.visibility
        try:
            visibility_list = json.loads(visibility)
            if isinstance(visibility_list, list):
                return visibility_list
        except (json.JSONDecodeError, TypeError):
            if ',' in visibility:
                visibility_list = [tier.strip() for tier in visibility.split(',')]
            else:
                visibility_list = [visibility.strip()]
            return visibility_list
        return []

    def check_visibility_match(self, post_visibility, user_tiers):
        if post_visibility:
            for tier in post_visibility:
                if tier in user_tiers:
                    return True
        return False

    def handle_comment(self, user, upload, request):
        serializer = CommentSerializer(data=request.data, context={'request': request, 'user': user, 'post': upload})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class CommentDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, comment_id):
        user = request.user

        try:
            comment = Comment.objects.get(id=comment_id)
        except Comment.DoesNotExist:
            return Response({"message": "Comment does not exist"}, status=status.HTTP_404_NOT_FOUND)

        if not self.can_delete_comment(user, comment):
            return Response({"error": "You are not allowed to delete this comment"}, status=status.HTTP_403_FORBIDDEN)

        comment.delete()
        return Response({"message": "Comment deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    def can_delete_comment(self, user, comment):
        post_owner = comment.post.uploaded_by

        user_tiers = self.get_user_tiers(user, comment.post)
        post_visibility = self.get_post_visibility(comment.post)

        print("User Tiers:", user_tiers)
        print("Post Visibility:", post_visibility)

        if not self.check_visibility_match(post_visibility, user_tiers):
            return False
        
        if not self.is_following(user, post_owner):
            return False

        if user == post_owner or user == comment.user or user.sharer == comment.post.uploaded_by:
            return True

        return False

    def get_user_tiers(self, user, upload):
        user_tiers = []
        if isinstance(upload, SharerUpload):
            try:
                sharer_instance = upload.uploaded_by
                if user.follows_tier1.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER1")
                if user.follows_tier2.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER2")
                if user.follows_tier3.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER3")
            except Sharer.DoesNotExist:
                pass
        return user_tiers


    def get_post_visibility(self, post):
        visibility = post.visibility
        try:
            visibility_list = json.loads(visibility)
            if isinstance(visibility_list, list):
                return visibility_list
        except (json.JSONDecodeError, TypeError):
            if ',' in visibility:
                visibility_list = [tier.strip() for tier in visibility.split(',')]
            else:
                visibility_list = [visibility.strip()]
            return visibility_list
        return []

    def check_visibility_match(self, post_visibility, user_tiers):
        if post_visibility:
            for tier in post_visibility:
                if tier in user_tiers:
                    return True
        return False

    def is_following(self, user, post_owner):
        return (user.follows_tier1.filter(id=post_owner.id).exists() or
                user.follows_tier2.filter(id=post_owner.id).exists() or
                user.follows_tier3.filter(id=post_owner.id).exists())





class CommentListView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        upload_id = self.kwargs.get('upload_id')
        
        try:
            upload = SharerUpload.objects.get(id=upload_id)
        except SharerUpload.DoesNotExist:
            print("Upload not found")
            return Comment.objects.none()

        user = self.request.user

        if user == upload.uploaded_by:
            print("User is the uploader. Returning all comments for the post.")
            queryset = Comment.objects.filter(post_id=upload_id).select_related('user')
            print("Comments:", queryset)
            return queryset

        try:
            sharer_instance = user.sharer
        except Sharer.DoesNotExist:
            sharer_instance = None
        
        if sharer_instance != upload.uploaded_by:
            user_tiers = self.get_user_tiers(user, upload)  # Pass 'upload' argument here
            post_visibility = self.get_post_visibility(upload)
        
            print("User Tiers:", user_tiers)
            print("Post Visibility:", post_visibility)
            
            if not self.check_visibility_match(post_visibility, user_tiers):
                print("Visibility check failed. User cannot view comments on the post.")
                return Comment.objects.none()
        return Comment.objects.filter(post_id=upload_id).select_related('user')


    def perform_create(self, serializer):
        upload_id = self.kwargs.get('upload_id')
        try:
            upload = SharerUpload.objects.get(id=upload_id)
        except SharerUpload.DoesNotExist:
            return Response({"error": "Upload not found"}, status=status.HTTP_400_BAD_REQUEST)

        user = self.request.user

        try:
            sharer_instance = user.sharer
        except Sharer.DoesNotExist:
            sharer_instance = None
        
        if sharer_instance != upload.uploaded_by:
            user_tiers = self.get_user_tiers(user)
            post_visibility = self.get_post_visibility(upload)
            
            if not self.check_visibility_match(post_visibility, user_tiers):
                return Response({"error": "You can only comment on posts with visibility matching your followed tiers or posts of users you follow"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer.save(user=user, post=upload)

    def get_user_tiers(self, user, upload):
        user_tiers = []
        if isinstance(upload, SharerUpload):
            try:
                sharer_instance = upload.uploaded_by
                if user.follows_tier1.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER1")
                if user.follows_tier2.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER2")
                if user.follows_tier3.filter(id=sharer_instance.id).exists():
                    user_tiers.append("FOLLOWERS_TIER3")
            except Sharer.DoesNotExist:
                pass
        return user_tiers


    def get_post_visibility(self, upload):
        visibility = upload.visibility
        try:
            visibility_list = json.loads(visibility)
            if isinstance(visibility_list, list):
                return visibility_list
        except (json.JSONDecodeError, TypeError):
            if ',' in visibility:
                visibility_list = [tier.strip() for tier in visibility.split(',')]
            else:
                visibility_list = [visibility.strip()]
            return visibility_list
        return []

    def check_visibility_match(self, post_visibility, user_tiers):
        if post_visibility:
            for tier in post_visibility:
                if tier in user_tiers:
                    return True
        return False
    
    def get_top_donors(self, upload):
        # Assuming top donors are calculated based on the sum of amounts donated by users
        top_donors = TipBox.objects.filter(sharer=upload.uploaded_by).values('user').annotate(total_amount=Sum('amount')).order_by('-total_amount')[:3]
        return top_donors

    def assign_badges(self, top_donors, user_id):
        top_donors_user_ids = [donor['user'] for donor in top_donors]
        if user_id in top_donors_user_ids:
            index = top_donors_user_ids.index(user_id)
            if index == 0:
                return "Gold"
            elif index == 1:
                return "Silver"
            elif index == 2:
                return "Bronze"
        return "None"

    def get_serializer_context(self):
        context = super().get_serializer_context()
        upload_id = self.kwargs.get('upload_id')
        try:
            upload = SharerUpload.objects.get(id=upload_id)
            top_donors = self.get_top_donors(upload)
            context['top_donors'] = top_donors
        except SharerUpload.DoesNotExist:
            context['top_donors'] = []
        return context
