from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Sharer
from .serializers import SharerSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def SharerView(request):
    queryset = Sharer.objects.all()
    serializer = SharerSerializer(queryset, many=True)
    return Response(serializer.data)
