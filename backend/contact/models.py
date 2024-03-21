# from django.db import models
# import os
# from django.core.exceptions import ValidationError


# # Create your models here.

# class Contact(models.Model):
#     PAYMENT = 'payment'
#     MEMBERSHIP = 'membership'
#     CONTENT = 'content'
#     OTHER = 'other'

#     REQUEST_TYPE_CHOICES = [
#         (PAYMENT, 'Payment issues'),
#         (MEMBERSHIP, 'Membership issues'),
#         (CONTENT, 'Content issues'),
#         (OTHER, 'Other'),
#     ]

#     request_type = models.CharField(max_length=100, choices=REQUEST_TYPE_CHOICES)
#     email = models.EmailField()
#     subject = models.CharField(max_length=255)
#     description = models.TextField()
#     attachment = models.FileField(upload_to='contact_attachments', null=True, blank=True)

#     def __str__(self):
#         return self.email

#     def clean(self):
#         super().clean()
#         if self.attachment:
#             # Get the file extension
#             ext = os.path.splitext(self.attachment.name)[1].lower()
#             # List of allowed file extensions
#             allowed_extensions = ['.pdf', '.jpeg', '.jpg', '.png', '.doc', '.docx']
#             # Check if the extension is not in the list of allowed extensions
#             if ext not in allowed_extensions:
#                 raise ValidationError('File type is not supported. Supported file types are: .pdf, .jpeg, .jpg, .png, .doc, .docx')


from django.db import models
import os
from django.core.exceptions import ValidationError

class Contact(models.Model):
    PAYMENT = 'payment'
    MEMBERSHIP = 'membership'
    CONTENT = 'content'
    OTHER = 'other'

    REQUEST_TYPE_CHOICES = [
        (PAYMENT, 'Payment issues'),
        (MEMBERSHIP, 'Membership issues'),
        (CONTENT, 'Content issues'),
        (OTHER, 'Other'),
    ]

    request_type = models.CharField(max_length=100, choices=REQUEST_TYPE_CHOICES)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    description = models.TextField()
    attachment = models.FileField(upload_to='contact_attachments', null=True, blank=True)

    def __str__(self):
        return self.email

    def clean(self):
        super().clean()
        if self.attachment:
            # Get the file extension
            ext = os.path.splitext(self.attachment.name)[1].lower()
            # List of allowed file extensions
            allowed_extensions = ['.pdf', '.jpeg', '.jpg', '.png', '.doc', '.docx']
            # Check if the extension is not in the list of allowed extensions
            if ext not in allowed_extensions:
                raise ValidationError('File type is not supported. Supported file types are: .pdf, .jpeg, .jpg, .png, .doc, .docx')
