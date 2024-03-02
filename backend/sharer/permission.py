from rest_framework.permissions import BasePermission
from .models import SharerUpload

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
