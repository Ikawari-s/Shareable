from django.urls import path
from . import views 
from .views import *


urlpatterns = [
    path('', views.SharerView, name='sharer-view'),
    path('update-profile-sharer/', SharerUpdateProfile.as_view(), name='update_profile'),
    path('sharer-upload', views.SharerUploadViews.as_view(), name='sharer-post'),
    path('sharer-upload-list', views.SharerUploadListView, name='sharer-post-list'),
    path('sharer-profile/<int:sharer_id>/', views.SharerProfileDetail.as_view(), name='sharer-profile'),
    path('user-sharer-profile/', views.UserSharerProfile.as_view(), name='my-profile'),
    path('sharer-latest-post/<int:sharer_id>/', views.SharerlatestPost, name='sharer-latest-post'),
    path('posts/like/<int:upload_id>/', views.LikePost.as_view(), name='like_post'),
    path('posts/unlike/<int:upload_id>/', views.UnlikePost.as_view(), name='unlike_post'),
    path('posts/count-likes/<int:upload_id>/', views.CountOfLikes.as_view(), name='count_likes'),
    path('posts/comment/<int:upload_id>/', views.CommentPost.as_view(), name='comment_post'),
    path('comment/delete/<int:comment_id>/', views.CommentDeleteView.as_view(), name='comment-delete'),
    path('comments/<int:upload_id>/', views.CommentListView.as_view(), name='comment-list'),
    path('sharer-post-delete/<int:upload_id>/', views.SharerDeletePostView.as_view(), name='delete_sharer_post'),
    path('ratings/<int:sharer_id>', views.RatingViews.as_view(), name='ratings'),
    path('delete-rating/<int:rating_id>', views.DeleteRating.as_view(), name='delete-ratings'),
    path('update-rating/<int:rating_id>', views.RatingUpdateView.as_view(), name='update-rating'),
    path('sharer-upload-edit/<int:upload_id>/', views.SharerUploadEditView.as_view(), name='sharer-upload-edit'),
    path('posts/count-posts/<int:sharer_id>/', views.PostCount.as_view(), name='count_posts'),
    path('preview-content/<int:post_id>/', views.PreviewContent.as_view(), name='preview_content'),
    path('preview-list-content/<int:sharer_id>/', PreviewContentList.as_view(), name='sharer_content_list'),
    path('tipboxes/create/<int:sharer_id>/', TipBoxCreateView.as_view(), name='tipbox-create'),
    path('dashboard/', DashboardRetrieveUpdateView.as_view(), name='dashboard-detail'),

]
