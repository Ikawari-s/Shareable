from django.contrib import admin
from django.urls import path, include
from backend import settings
from django.conf import settings
from django.conf.urls.static import static

from contact.views import SubmitContactRequestView
from rest_framework import routers
router = routers.DefaultRouter()
router.register('contacts', SubmitContactRequestView, basename='contact')

urlpatterns = ([
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/sharer/', include('sharer.urls')),
    path('api/', include(router.urls)),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
               + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT))



