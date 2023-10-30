from django.db import models

class MappingMarker(models.Model):
    id = models.AutoField(primary_key=True)
    lat = models.FloatField()
    lng = models.FloatField()

    class Meta:
        db_table = 'mapping_marker'  # データベーステーブルの名前を指定
        managed = False
