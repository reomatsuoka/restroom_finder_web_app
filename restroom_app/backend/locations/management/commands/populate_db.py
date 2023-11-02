from typing import Any
from django.core.management.base import BaseCommand, CommandParser
from locations.models import Location
import random

LAT = 35.681236
LNG = 139.767125

LAT_PLUS_MINUS = 0.090
LNG_PLUS_MINUS = 0.130

def generate_lat_lng():
    return {
        'lat': LAT + random.uniform(-LAT_PLUS_MINUS, LAT_PLUS_MINUS),
        'lng': LNG + random.uniform(-LNG_PLUS_MINUS, LNG_PLUS_MINUS),
    }

class Command(BaseCommand):
    help = 'Creates random location data'

    def add_arguments(self, parser):
        return parser.add_argument('count', type=int)
    
    def handle(self, *args: Any, **options: Any) -> str | None:
        count = options['count']
        for _ in range(count):
            Location.objects.create(**generate_lat_lng())