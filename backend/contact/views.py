from django.shortcuts import render


from django.core.mail import send_mail
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Contact
from .serializers import ContactSerializer
from django.core.mail import EmailMessage
from io import BytesIO
import base64
import mimetypes



class SubmitContactRequestView(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            contact_data = serializer.validated_data
            serializer.save()
            self.send_contact_email(contact_data)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def send_contact_email(self, contact_data):
        subject = 'Thank You for Contacting Shareable!'
        message = f"""
        Thank you for contacting Shareable! Reminder: This is a copy of your submitted message for your reference.

        Here is a copy of your message:
        Request Type: {contact_data['request_type']}
        Email: {contact_data['email']}
        Subject: {contact_data['subject']}
        Description: {contact_data['description']}
        Attached file: {contact_data['attachment'].name}
        
        We will get back to you as soon as possible.

        Best regards,
        The Shareable Team
        """

        from_email = 'shareable2024@gmail.com'
        to_email = [contact_data['email']] 

        email_message = EmailMessage(subject, message, from_email, to_email)

        if contact_data['attachment']:
            attachment = contact_data['attachment']
            email_message.attach(attachment.name, attachment.read(), attachment.content_type)

        email_message.send(fail_silently=False)

