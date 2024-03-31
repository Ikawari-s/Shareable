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
        if self.pk is not None:
            orig = AppUser.objects.get(pk=self.pk)
            if orig.is_sharer and not self.is_sharer:
                self.sharer.delete()
        super().save(*args, **kwargs)

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