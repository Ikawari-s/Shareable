from django.contrib import admin
from .models import Sharer, SharerUpload, Like, Comment

@admin.register(Sharer)
class SharerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'username', 'email', 'category', 'is_sharer')  
    search_fields = ('id', 'name', 'username', 'email', 'category')  
    list_filter = ('category',)

@admin.register(SharerUpload)
class SharerUploadAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'uploaded_by', 'created_at', 'get_likes_count', 'get_unlikes_count', 'get_comments_count')  
    search_fields = ('id', 'title', 'uploaded_by__name') 
    list_filter = ('created_at', 'uploaded_by__category')

    def get_likes_count(self, obj):
        return obj.likes.filter(liked=True).count()
    get_likes_count.short_description = 'Likes'

    def get_unlikes_count(self, obj):
        return obj.likes.filter(liked=False).count()
    get_unlikes_count.short_description = 'Unlikes'

    def get_comments_count(self, obj):
        return obj.comments.count()
    get_comments_count.short_description = 'Comments'

    def get_comments(self, obj):
        return '\n'.join([c.content for c in obj.comments.all()])
    get_comments.short_description = 'Comments'

    def get_likes(self, obj):
        return '\n'.join([f"{like.user.username} - Liked" if like.liked else f"{like.user.username} - Unliked" for like in obj.likes.all()])
    get_likes.short_description = 'Likes'

    def unlike_posts(self, request, queryset):
        for post in queryset:
            Like.objects.filter(post=post, liked=True).delete()
        self.message_user(request, "Selected posts unliked successfully.")
    unlike_posts.short_description = "Unlike selected posts"

    actions = ['unlike_posts']  # Registering the action within the SharerUploadAdmin class

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post', 'liked', 'unliked')
    list_filter = ('liked', 'unliked')
    search_fields = ('user__username', 'post__title')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post', 'comments', 'created_at')  
    search_fields = ('user__username', 'post__title', 'comments')  
