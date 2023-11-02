from django.db import models

class Location(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()