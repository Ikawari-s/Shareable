from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from accounts.serializers import *
from sharer.serializers import *
from contact.models import Contact
from contact.serializers import ContactSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
User = get_user_model()
from rest_framework import generics

def get_users_with_status():
    return UserModel.objects.all()

def get_sharers_with_income():
    return Sharer.objects.all()

class AdminUserDashboard(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        users = get_users_with_status()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminUserPatchDelete(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def patch(self, request, pk):
        try:
            user = AppUser.objects.get(pk=pk)
        except AppUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            # Call the save() method of the user instance to execute the custom save logic
            user.save()

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)



class AdminSharerDashboard(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def get(self, request):
        sharers = get_sharers_with_income()
        dashboards = Dashboard.objects.filter(sharer__in=sharers)
        
        sharer_serializer = SharerSerializer(sharers, many=True)
        dashboard_serializer = DashboardSerializer(dashboards, many=True)
        
        sharer_data = sharer_serializer.data
        dashboard_data = dashboard_serializer.data
        
        for entry in dashboard_data:
            total_earnings = Decimal(entry['total_earnings'])
            twenty_percent = Decimal('0.20')
            twenty_percent_earnings = total_earnings * twenty_percent
            
            entry['twenty_percent_less_earning_send'] = total_earnings - twenty_percent_earnings
            entry['twenty_percent_cut'] = twenty_percent_earnings

        for sharer_entry in sharer_data:
            sharer_id = sharer_entry['id']
            related_dashboard = next((dashboard for dashboard in dashboard_data if dashboard['sharer'] == sharer_id), None)
            if related_dashboard:
                sharer_entry.update(related_dashboard)

        combined_data = list(zip(sharer_data, dashboard_data))
        
        return Response(combined_data, status=status.HTTP_200_OK)
    

    
class AdminSendIncome(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request, sharer_id):
        try:
            dashboard_instance = Dashboard.objects.get(sharer_id=sharer_id)
            dashboard_serializer = DashboardSerializer(dashboard_instance)
            twenty_percent_less_earning_sent = dashboard_serializer.data.get('twenty_percent_less_earning_send')

            if twenty_percent_less_earning_sent > 0:
                sharer_instance = Sharer.objects.get(id=sharer_id)
                sharer_serializer = SharerSerializer(sharer_instance)
                sharer_email = sharer_serializer.data.get('email')

                if sharer_email:
                    send_mail(
                        'Earnings Sent',
                        f'Your earnings have been sent. Amount sent: ${twenty_percent_less_earning_sent}',
                        settings.EMAIL_HOST_USER,
                        [sharer_email],
                    )

                    dashboard_instance.total_earnings = 0
                    dashboard_instance.save()
                    
                    return Response({'message': f'Earnings sent and total earnings set to zero.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Sharer email not found.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Income is zero.'}, status=status.HTTP_400_BAD_REQUEST)
        except Dashboard.DoesNotExist:
            return Response({'error': 'Dashboard data not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Sharer.DoesNotExist:
            return Response({'error': 'Sharer data not found.'}, status=status.HTTP_404_NOT_FOUND)



class AdminPatchSharer(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def patch(self, request, sharer_id):
        try:
            sharer_instance = Sharer.objects.get(id=sharer_id)
            sharer_serializer = SharerSerializer(sharer_instance, data=request.data, partial=True)
            if sharer_serializer.is_valid():
                sharer_serializer.save()
                return Response(sharer_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(sharer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Sharer.DoesNotExist:
            return Response({'error': 'Sharer data not found.'}, status=status.HTTP_404_NOT_FOUND)
        
class SearchUser(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        query = request.query_params.get('query', None)
        if not query:
            return Response({'error': 'Query parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
       
            user = User.objects.get(email=query)
        except User.DoesNotExist:
            try:
                user = User.objects.get(username=query)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SearchSharer(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        query = request.query_params.get('query', None)
        if not query:
            return Response({'error': 'Query parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            sharer = Sharer.objects.get(email=query)
        except Sharer.DoesNotExist:
            try:
                sharer = Sharer.objects.get(name=query)
            except Sharer.DoesNotExist:
                return Response({'error': 'Sharer not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = SharerSerializer(sharer)
        return Response(serializer.data, status=status.HTTP_200_OK)



class UserContacts(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = ContactSerializer

    def get_queryset(self):
        queryset = Contact.objects.all()
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(email__icontains=search_term)
        return queryset.order_by('-created_at')
    
    
class DeleteContacts(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def delete(self, request, pk):
        contact = get_object_or_404(Contact, pk=pk)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)