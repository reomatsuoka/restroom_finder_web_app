from rest_framework import serializers
from .models import MappingMarker

class MarkerSerializer(serializers.ModelSerializer):

    class Meta:
        model = MappingMarker
        fields = '__all__'