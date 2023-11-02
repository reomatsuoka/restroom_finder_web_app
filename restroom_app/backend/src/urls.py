from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from locations.api import LocationViewSet

router = DefaultRouter()
router.register(r'locations', LocationViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
