from rest_framework import viewsets
from .models import MappingMarker
from .serializers import MarkerSerializer

class MarkerViewSet(viewsets.ModelViewSet):
    queryset = MappingMarker.objects.all()
    serializer_class = MarkerSerializer