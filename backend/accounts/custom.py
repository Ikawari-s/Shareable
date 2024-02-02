# Example: custom_backend.py
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class CustomBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(username=username)
        except UserModel.DoesNotExist:
            return None

        if user.is_staff and user.check_password(password):
            return user
        return None
