from django.utils.deprecation import MiddlewareMixin
from .views import FollowSharer

class CheckExpiredFollowsMiddleware(MiddlewareMixin):
    def process_request(self, request):
        FollowSharer().check_expired_follows()
