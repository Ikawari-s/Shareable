from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.mail import send_mail
from django.utils import timezone
import random
import string
from django.conf import settings
from sharer.models import Sharer
from django.core.validators import MinLengthValidator
from threading import local
thread_locals = local()

class AppUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('An email is required.')
        if not username:
            raise ValueError('A username is required.')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)  # Set is_superuser to True for superuser
        return self.create_user(email, username, password, **extra_fields)


class AppUser(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True, validators=[MinLengthValidator(4)])
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_sharer = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    follows_tier1 = models.ManyToManyField(Sharer, related_name="follower_tier1", blank=True)
    follows_tier2 = models.ManyToManyField(Sharer, related_name="follower_tier2", blank=True)
    follows_tier3 = models.ManyToManyField(Sharer, related_name="follower_tier3", blank=True)
    profile_picture = models.ImageField(upload_to='uploads/images', default='uploads/default/default.png', null=True, blank=True)
    otp_id = models.CharField(max_length=50, blank=True, null=True) 

    otp_code = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(blank=True, null=True)
    otp_expires_at = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = AppUserManager()

    def __str__(self):
        return self.username

    def generate_otp(self):
        return ''.join(random.choices(string.digits, k=6))

    def send_otp(self, otp_id):
        otp = self.generate_otp()
        self.otp_code = otp
        self.otp_created_at = timezone.now()
        self.otp_expires_at = self.otp_created_at + timezone.timedelta(minutes=5)
        self.otp_id = otp_id  # Store OTP ID
        self.save()

        subject = 'Your OTP for verification'
        message = f'Your OTP is: {otp}'
        from_email = settings.EMAIL_HOST_USER
        to = [self.email]

        send_mail(subject, message, from_email, to)

    def verify_otp(self, otp, otp_id):
        return self.otp_code == otp and self.otp_expires_at > timezone.now() and self.otp_id == otp_id  # Check OTP ID as well

    def save(self, *args, **kwargs):
        # Check if the current context is Be_sharer
        if hasattr(thread_locals, 'is_be_sharer_context') and thread_locals.is_be_sharer_context:
            super().save(*args, **kwargs)  # Call the parent save method
        else:
            # your existing save method logic
            if self.pk is not None:
                orig = AppUser.objects.get(pk=self.pk)
                if orig.is_sharer and not self.is_sharer:
                    self.sharer.delete()
                super().save(*args, **kwargs)
                # Update Sharer username if changed
                if orig.username != self.username:
                    try:
                        self.sharer.username = self.username
                        self.sharer.save()
                    except Sharer.DoesNotExist:
                        pass
                # Update Sharer image if changed
                if orig.profile_picture != self.profile_picture:
                    try:
                        self.sharer.image = self.profile_picture
                        self.sharer.save()
                    except Sharer.DoesNotExist:
                        pass


                # Create Sharer instance if the user is not currently a sharer and is set to true
                if not orig.is_sharer and self.is_sharer:
                    sharer_category = self.sharer.category if hasattr(self, 'sharer') else ''  # Retrieve category from Sharer model
                    sharer_description = f"Sharer profile for {self.username}"  # Set description as "Sharer profile for [username]"
                    sharer = Sharer.objects.create(
                        name=self.username,
                        username=self.username,
                        email=self.email,
                        user=self,
                        category=sharer_category,  # Adding the category field here
                        description=sharer_description  # Adding the description field here
                    )
                    if self.profile_picture:
                        sharer.image = self.profile_picture
                        sharer.save()
                    self.sharer = sharer
                    self.save()
            else:
                super().save(*args, **kwargs)
                # Create Sharer instance if the user is not a sharer and is set to true
                if self.is_sharer:
                    sharer_category = self.sharer.category if hasattr(self, 'sharer') else ''  # Retrieve category from Sharer model
                    sharer_description = f"Sharer profile for {self.username}"  # Set description as "Sharer profile for [username]"
                    if not hasattr(self, 'sharer'):
                        # Create Sharer instance with the username, email, category, and description from the AppUser
                        sharer = Sharer.objects.create(
                            name=self.username,
                            username=self.username,
                            email=self.email,
                            user=self,  # Linking the Sharer to the AppUser
                            category=sharer_category,  # Adding the category field here
                            description=sharer_description  # Adding the description field here
                        )
                        if self.profile_picture:
                            sharer.image = self.profile_picture
                            sharer.save()
                        self.sharer = sharer
                        self.save()

                        
class beSharer(models.Model):
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class FollowExpiration(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    sharer = models.ForeignKey(Sharer, on_delete=models.CASCADE)
    expiration_date = models.DateTimeField()

    def is_expired(self):
        return self.expiration_date <= timezone.now()

    def check_and_unfollow_if_expired(self):
        if self.is_expired():
            user = self.user
            sharer = self.sharer
            user.follows_tier1.remove(sharer)
            user.follows_tier2.remove(sharer)
            user.follows_tier3.remove(sharer)
            user.save()
            self.delete()
    

class FollowActivity(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    sharer = models.ForeignKey('sharer.Sharer', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return self.timestamp + timezone.timedelta(seconds=10) <= timezone.now()