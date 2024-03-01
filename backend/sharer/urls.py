from django.urls import path
from . import views


urlpatterns = [
    path('', views.SharerView, name='sharer-view'),
    path('sharer-upload', views.SharerUploadViews.as_view(), name='sharer-post'),
    path('sharer-upload-list', views.SharerUploadListView, name='sharer-post-list'),
    path('sharer-profile/<int:sharer_id>/', views.SharerProfileDetail.as_view(), name='sharer-profile'),
    path('user-sharer-profile/', views.UserSharerProfile.as_view(), name='my-profile'),
    path('sharer-lates-post/<int:sharer_id>/', views.SharerlatestPost, name='sharer-latest-post'),
    path('posts/like/<int:upload_id>/', views.LikePost.as_view(), name='like_post'),
    path('posts/unlike/<int:upload_id>/', views.UnlikePost.as_view(), name='unlike_post'),
    path('posts/count-likes/<int:upload_id>/', views.CountOfLikes.as_view(), name='count_likes'),
    path('posts/comment/<int:upload_id>/', views.CommentPost.as_view(), name='comment_post'),
    path('comment/delete/<int:comment_id>/', views.CommentDeleteView.as_view(), name='comment-delete'),
    path('comments/<int:upload_id>/', views.CommentListView.as_view(), name='comment-list'),

]
    