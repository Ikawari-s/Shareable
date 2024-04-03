from rest_framework import serializers
from .models import *
from accounts.models import AppUser
from django.utils import timezone
from django.contrib.auth import get_user_model
from decimal import Decimal
from django.db.models.functions import Coalesce
from django.db.models import Sum, DecimalField
from sharer.models import TipBox

class SharerSerializer(serializers.ModelSerializer):
    total_followers = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Sharer
        fields = '__all__'

    def get_total_followers(self, obj):
        return obj.total_followers

    def get_average_rating(self, obj):
        ratings = obj.ratings.all()
        if ratings.exists():
            total_ratings = ratings.count()
            sum_ratings = sum([rating.rating for rating in ratings])
            average_rating = sum_ratings / total_ratings
            # Format the average_rating to two decimal places
            return round(average_rating, 2)
        return 0  # Return 0 if no ratings exist for the sharer
    

    

class SharerUploadListSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    edited_at_formatted = serializers.SerializerMethodField()
    edited = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    videos = serializers.SerializerMethodField()
    files = serializers.SerializerMethodField()
    visibility = serializers.CharField() 

    class Meta:
        model = SharerUpload
        fields = ['id', 'title', 'description', 'images', 'videos', 'files', 'created_at', 'edited_at_formatted', 'edited', 'visibility']

    def get_edited_at_formatted(self, instance):
        edited_at = instance.edited_at
        if edited_at:
            return timezone.localtime(edited_at).strftime('%Y-%m-%d %H:%M:%S')
        return None

    def get_edited(self, instance):
        return instance.edited_at is not None

    def get_images(self, instance):
        images = instance.images.all()
        if images:
            return [{'image': image.image.url} for image in images]
        return []

    def get_videos(self, instance):
        videos = instance.videos.all()
        if videos:
            return [{'video': video.video.url} for video in videos]
        return []

    def get_files(self, instance):
        files = instance.files.all()
        if files:
            return [{'file': file.file.url} for file in files]
        return []
    

class SharerUploadSerializer(serializers.ModelSerializer):
    created_at_formatted = serializers.SerializerMethodField()
    edited_at_formatted = serializers.SerializerMethodField()
    edited = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    video = serializers.SerializerMethodField()
    file = serializers.SerializerMethodField()
    

    VISIBILITY_CHOICES = [
        ('NON_FOLLOWER', 'Preview Content'),
        ('FOLLOWERS_TIER1', 'BRONZE - Tier'),
        ('FOLLOWERS_TIER2', 'SILVER - Tier'),
        ('FOLLOWERS_TIER3', 'GOLD - Tier'),
    ]
    
    visibility = serializers.CharField(max_length=255, allow_blank=True)

    class Meta:
        model = SharerUpload
        fields = ['id', 'title', 'description', 'image', 'video', 'file', 'created_at', 'created_at_formatted', 'edited_at', 'edited_at_formatted', 'edited', 'visibility']

    def get_created_at_formatted(self, obj):
        return obj.created_at.strftime('%Y-%m-%d %H:%M:%S') if obj.created_at else None
    
    def get_edited_at_formatted(self, obj):
        return obj.edited_at.strftime('%Y-%m-%d %H:%M:%S') if obj.edited_at else None

    def get_edited(self, obj):
        return obj.edited_at is not None
    
    def get_image(self, obj):
        image_urls = [image.image.url for image in obj.images.all()]
        return image_urls if image_urls else None

    def get_video(self, obj):
        video_urls = [video.video.url for video in obj.videos.all()]
        return video_urls if video_urls else None

    def get_file(self, obj):
        file_urls = [file.file.url for file in obj.files.all()]
        return file_urls if file_urls else None

    def create(self, validated_data):
        image_data = self.context.get('request').FILES.getlist('images')
        video_data = self.context.get('request').FILES.getlist('videos')
        file_data = self.context.get('request').FILES.getlist('files')

        visibilities = validated_data.pop('visibility', '').split(',')


        visibility_string = ','.join(visibilities)


        sharer_upload = SharerUpload.objects.create(**validated_data, visibility=visibility_string)


        for data in image_data:
            SharerUploadImage.objects.create(upload=sharer_upload, image=data)

        for data in video_data:
            SharerUploadVideo.objects.create(upload=sharer_upload, video=data)

        for data in file_data:
            SharerUploadFile.objects.create(upload=sharer_upload, file=data)

        return sharer_upload



class SharerProfileSerializer(serializers.ModelSerializer):
    cover_photo = serializers.ImageField(source='user.profile_picture', read_only=True)

    class Meta:
        model = Sharer
        fields = ['id', 'email', 'image', 'username', 'name', 'category', 'cover_photo']



class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['user', 'post', 'liked']


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    profile_picture = serializers.ImageField(source='user.profile_picture', read_only=True)
    badge = serializers.SerializerMethodField()


    class Meta:
        model = Comment
        fields = ['id', 'user', 'username', 'post', 'comments', 'created_at', 'profile_picture', 'badge']

    def get_username(self, obj):
        return obj.user.username

    def create(self, validated_data):
        post = validated_data.pop('post')
        return Comment.objects.create(post=post, **validated_data)
    
    def get_badge(self, obj):
        if 'top_donors' in self.context:
            top_donors = self.context['top_donors']
            return self.context['view'].assign_badges(top_donors, obj.user.id)
        return "None"


class RatingSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    profile_picture = serializers.SerializerMethodField()
    user_rated = serializers.SerializerMethodField()
    already_rated = serializers.BooleanField(read_only=True)
    average_rating = serializers.SerializerMethodField()
    badge = serializers.SerializerMethodField()


    class Meta:
        model = Rating
        fields = ['id', 'sharer', 'user', 'rating', 'comment', 'username', 'profile_picture', 'user_rated', 'already_rated', 'average_rating', 'badge']

    def get_user_tier(self, obj):
        user = obj.user
        if user:
            if user.follows_tier1.filter(id=obj.sharer_id).exists():
                return 'tier1'
            elif user.follows_tier2.filter(id=obj.sharer_id).exists():
                return 'tier2'
            elif user.follows_tier3.filter(id=obj.sharer_id).exists():
                return 'tier3'
        return None

    def get_username(self, obj):
        return obj.user.username if obj.user else None

    def get_profile_picture(self, obj):
        user_id = obj.user_id
        user_instance = get_user_model().objects.filter(id=user_id).first()
        return user_instance.profile_picture.url if user_instance and user_instance.profile_picture else None

    def get_user_rated(self, obj):  
        user = self.context['user']
        return Rating.objects.filter(user=user, sharer=obj.sharer).exists()

    def get_average_rating(self, obj):
        sharer_id = obj.sharer_id
        average_rating = Rating.objects.filter(sharer=sharer_id).aggregate(avg_rating=Avg('rating'))['avg_rating']
        return round(average_rating, 2) if average_rating is not None else None


    rating = serializers.DecimalField(max_digits=5, decimal_places=2)

    def get_badge(self, obj):
        try:
            top_donors = TipBox.objects.filter(sharer=obj.sharer).values('user').annotate(
                total_amount=Coalesce(Sum('amount'), 0, output_field=DecimalField())
            ).order_by('-total_amount')[:3]

            top_donor_ids = [donor['user'] for donor in top_donors]

            if obj.user.id == top_donor_ids[0]:
                return 'Gold'
            elif obj.user.id == top_donor_ids[1]:
                return 'Silver'
            elif obj.user.id == top_donor_ids[2]:
                return 'Bronze'
            return 'None'
        except:
            return 'None'




class TipBoxCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipBox
        fields = ['user', 'sharer', 'amount'] 

class DashboardSerializer(serializers.ModelSerializer):
    sharer = serializers.StringRelatedField()
    total_post_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    total_likes = serializers.SerializerMethodField()
    total_unlikes = serializers.SerializerMethodField()
    total_uploads = serializers.SerializerMethodField()
    twenty_percent_less_earning_send = serializers.SerializerMethodField()
    twenty_percent_cut = serializers.SerializerMethodField()

    class Meta:
        model = Dashboard
        fields = ['sharer', 'total_earnings', 'twenty_percent_less_earning_send', 'twenty_percent_cut', 'total_post_count', 'average_rating', 'total_likes', 'total_unlikes', 'total_uploads']

    def get_twenty_percent_less_earning_send(self, obj):
        twenty_percent = Decimal('0.20')
        total_earnings_decimal = Decimal(str(obj.total_earnings))  
        twenty_percent_earnings = total_earnings_decimal * twenty_percent
        return total_earnings_decimal - twenty_percent_earnings

    def get_twenty_percent_cut(self, obj):
        twenty_percent = Decimal('0.20')    
        twenty_percent_earnings = obj.total_earnings * twenty_percent
        return twenty_percent_earnings
        
    def get_total_post_count(self, obj):
        return SharerUpload.objects.filter(uploaded_by=obj.sharer).count()

    def get_average_rating(self, obj):
        ratings = Rating.objects.filter(sharer=obj.sharer)
        if ratings.exists():
            total_ratings = ratings.count()
            sum_ratings = sum([rating.rating for rating in ratings])
            average_rating = sum_ratings / total_ratings
            return round(average_rating, 2)  # Round the average rating to 2 decimal places
        return None 

    def get_total_likes(self, obj):
        return Like.objects.filter(post__uploaded_by=obj.sharer, liked=True).count()

    def get_total_unlikes(self, obj):
        return Like.objects.filter(post__uploaded_by=obj.sharer, unliked=True).count()
    
    def get_total_uploads(self, obj):
        return SharerUpload.objects.filter(uploaded_by=obj.sharer).count()