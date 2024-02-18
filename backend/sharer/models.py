from django.db import models
from django.conf import settings


class Sharer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads/images', null=False, blank=False)
    name = models.CharField(max_length=30, null=False, blank=False)
    description = models.CharField(max_length=150, null=False, blank=False)
    category = models.CharField(max_length=30, null=False, blank=False)
    
    def __str__(self):
        return self.name

class SharerUpload(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.CharField(max_length=1000000, null=False, blank=False)
    image = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='uploads')

    def __str__(self):
        return f"{self.uploaded_by.email}'s POSTER: {self.title}"
