from django.db import models

# Create your models here.
class Sharer(models.Model):
    profile_pic = models.ImageField(upload_to='uploads/images', null=False, blank=False)
    name = models.CharField(max_length=30, null=False, blank=False)
    description = models.CharField(max_length=150, null=False, blank=False)
    category = models.CharField(max_length=30, null=False, blank=False)
    cover_photo = models.ImageField(upload_to='uploads/images', null=True, blank=True)

    def __str__(self):
        return self.name