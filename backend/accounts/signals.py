from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import AppUser
from sharer.models import Sharer

@receiver(post_save, sender=AppUser)
def create_sharer_profile(sender, instance, created, **kwargs):
    if created and instance.is_sharer:
        Sharer.objects.create(
            name=instance.username,
            description="",
            category="",
            # Assuming you have a default image for a new sharer
            # Replace 'default_image.jpg' with your default image path
            image='uploads//default_image.jpg'
        )
