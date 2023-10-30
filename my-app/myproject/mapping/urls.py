from django.urls import path, include
from .views import MarkerViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'markers', MarkerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]