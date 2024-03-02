from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.mail import send_mail
from django.utils import timezone
import random
import string
from django.conf import settings
from sharer.models import Sharer

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
        user = self.create_user(email=email, username=username, password=password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    is_active = models.BooleanField(default=False)  
    is_staff = models.BooleanField(default=False)
    is_sharer = models.BooleanField(default=False)
    follows = models.ManyToManyField(Sharer, related_name="follower", symmetrical=False,  blank=True)


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

    def send_otp(self):
        otp = self.generate_otp()
        self.otp_code = otp
        self.otp_created_at = timezone.now()
        self.otp_expires_at = self.otp_created_at + timezone.timedelta(minutes=5)  # OTP expires in 5 minutes
        self.save()

        subject = 'Your OTP for verification'
        message = f'Your OTP is: {otp}'
        from_email = settings.EMAIL_HOST_USER
        to = [self.email]

        send_mail(subject, message, from_email, to)

    def verify_otp(self, otp):
        return self.otp_code == otp and self.otp_expires_at > timezone.now()

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
