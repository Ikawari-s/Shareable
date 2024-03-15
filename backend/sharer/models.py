from django.db import models
from django.conf import settings
from django.utils.text import slugify
from django.core.validators import FileExtensionValidator
from django.core.validators import MinValueValidator, MaxValueValidator

def upload_image(instance, filename):
    filename = slugify(filename)
    return f'uploads/images/{filename}'

def upload_video(instance, filename):
    filename = slugify(filename)
    return f'uploads/videos/{filename}'

def upload_file(instance, filename):
    filename = slugify(filename)
    return f'uploads/files/{filename}'


class Sharer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    email = models.EmailField()
    image = models.ImageField(upload_to=upload_image, null=False, blank=False)
    name = models.CharField(max_length=30, null=False, blank=False)
    description = models.CharField(max_length=150, null=False, blank=False)
    
    CATEGORY_CHOICES = [
        ('', 'Not specified'),
        ('Art', 'Art'),
        ('Comics', 'Comics'),
        ('Writing', 'Writing'),
        ('Music', 'Music'),
        ('Podcasts', 'Podcasts'),
        ('Video & Film', 'Video & Film'),
        ('Photography', 'Photography'),
        ('Crafts & DIY', 'Crafts & DIY'),
        ('Dance & Theater', 'Dance & Theater'),
        ('Gaming', 'Gaming'),
        ('Education', 'Education'),
        ('Science', 'Science'),
        ('Technology', 'Technology'),
        ('Health & Fitness', 'Health & Fitness'),
        ('Lifestyle', 'Lifestyle'),
        ('Fashion & Beauty', 'Fashion & Beauty'),
        ('Food & Cooking', 'Food & Cooking'),
        ('Travel & Outdoor', 'Travel & Outdoor'),
        ('Business & Entrepreneurship', 'Business & Entrepreneurship'),
        ('Parenting & Family', 'Parenting & Family'),
    ]
    
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, null=False, blank=False)
    
    username = models.CharField(max_length=50)  
    id = models.AutoField(primary_key=True)
    
    def __str__(self):
        return self.name
    
    @property
    def is_sharer(self):
        return self.user.is_sharer if self.user else False

    def save(self, *args, **kwargs):
        if not self.username:  # Only update if username is not provided
            self.username = self.user.username if self.user else ''
        self.email = self.user.email if self.user else ''
        super().save(*args, **kwargs)

class SharerUpload(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.CharField(max_length=1000000, null=False, blank=False)
    image = models.ImageField(upload_to=upload_image, null=True, blank=True)
    video = models.FileField(upload_to=upload_video, null=True, blank=True)  
    file = models.FileField(upload_to=upload_file, null=True, blank=True)  
    uploaded_by = models.ForeignKey(Sharer, on_delete=models.CASCADE, related_name='uploads')
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(null=True, blank=True)  # Add edited_at field
    
    def __str__(self):
        return f"{self.uploaded_by.email}'s Title: {self.title}"
    
    def count_likes(self):
        return self.likes.count()
    
    def count_comments(self):
        return self.comments.count()

class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(SharerUpload, on_delete=models.CASCADE, related_name='likes')
    liked = models.BooleanField(default=True)
    unliked = models.BooleanField(default=False) 

    class Meta:
        unique_together = ('user', 'post')

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(SharerUpload, on_delete=models.CASCADE, related_name='comments')
    username = models.CharField(max_length=150)  # Add a field to store the username
    comments = models.TextField(max_length=1000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.username = self.user.username 
        super().save(*args, **kwargs)

    

class Rating(models.Model):
    sharer = models.ForeignKey(Sharer, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=3, decimal_places=1, validators=[MinValueValidator(0), MaxValueValidator(5)])
    comment = models.TextField(blank=True)

    def __str__(self):
        return f"Rating {self.rating} by {self.user.username} for {self.sharer.name}"