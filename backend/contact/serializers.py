from rest_framework import serializers
from .models import Contact
import os

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['request_type', 'email', 'subject', 'description', 'attachment']

    # def validate_attachment(self, value):
    #     if value:
    #         # Get the file extension
    #         ext = os.path.splitext(value.name)[1].lower()
    #         # List of allowed file extensions
    #         allowed_extensions = ['.pdf', '.jpeg', '.jpg', '.png', '.doc', '.docx']
    #         # Check if the extension is not in the list of allowed extensions
    #         if ext not in allowed_extensions:
    #             raise serializers.ValidationError('File type is not supported. Supported file types are: .pdf, .jpeg, .jpg, .png, .doc, .docx')
    #     return value

