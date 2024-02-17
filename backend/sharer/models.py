from django.db import models
from accounts.models import AppUser

# Create your models here.
class Sharer(models.Model):
    image = models.ImageField(upload_to='uploads/images', null=False, blank=False)
    name = models.CharField(max_length=30, null=False, blank=False)
    description = models.CharField(max_length=150, null=False, blank=False)
    category = models.CharField(max_length=30, null=False, blank=False)
    follows = models.ManyToManyField(AppUser, symmetrical=False,  blank=True )


    def __str__(self):
        return self.name