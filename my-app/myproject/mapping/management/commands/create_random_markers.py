from mapping.models import MappingMarker
from django.core.management import BaseCommand, CommandParser
import random

"""
ランダムな座標でピンを作成し、PostgreSQLに保存する
"""
def create_random_markers(n):
    for _ in range(n):
        MappingMarker.objects.create(
            lat = 34.0 + random.random(),
            lng = 139.0 + random.random(),
        )

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('n', type=int)

    def handle(self, *args, **options):
        create_random_markers(options['n'])
        self.stdout.write(self.style.SUCCESS(f'Successfully created {options["n"]} random marker(s)'))