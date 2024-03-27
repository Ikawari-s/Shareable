from rest_framework.permissions import BasePermission
from rest_framework import permissions
from .models import *
from accounts.models import AppUser



class IsFollow(BasePermission):
    """
    Custom permission to allow users to delete comments if they are following the sharer.
    """

    def has_permission(self, request, view):
        user = request.user
        if user.is_authenticated:
            try:
                upload_id = view.kwargs.get('upload_id')
                upload = SharerUpload.objects.get(pk=upload_id)
            except SharerUpload.DoesNotExist:
                return False  # SharerUpload doesn't exist, deny permission
            
            # Check if the user is following the uploader of the SharerUpload
            return user in upload.uploaded_by.followers.all()
        
        return False


def is_follow(user, sharer_id, tier):
    """
    Check if the user follows the specified sharer in the given tier.
    """
    try:
        user_instance = AppUser.objects.get(pk=user.pk)
        sharer = Sharer.objects.get(pk=sharer_id)
    except AppUser.DoesNotExist:
        return False
    except Sharer.DoesNotExist:
        return False

    if tier == 'tier1':
        return user_instance.follows_tier1.filter(pk=sharer_id).exists()
    elif tier == 'tier2':
        return user_instance.follows_tier2.filter(pk=sharer_id).exists()
    elif tier == 'tier3':
        return user_instance.follows_tier3.filter(pk=sharer_id).exists()
    else:
        return False  # Invalid tier provided



class IsSharer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_sharer


class IsSharerPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_sharer
    


# for comment list
def is_following(user, uploader_id, visibility):
    try:
        user_instance = AppUser.objects.get(pk=user.pk)
        uploader = Sharer.objects.get(pk=uploader_id)
    except AppUser.DoesNotExist:
        return False
    except Sharer.DoesNotExist:
        return False

    if visibility == 'FOLLOWERS_TIER1':
        return user_instance.follows_tier1.filter(pk=uploader_id).exists()
    elif visibility == 'FOLLOWERS_TIER2':
        return user_instance.follows_tier2.filter(pk=uploader_id).exists()
    elif visibility == 'FOLLOWERS_TIER3':
        return user_instance.follows_tier3.filter(pk=uploader_id).exists()
    else:
        return False