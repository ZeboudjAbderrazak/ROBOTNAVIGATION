from django.urls import path
from .views import robot_list, robot_detail, connection_requests

urlpatterns = [
    path('', robot_list, name='robot-list'),
    path('robots/<int:robot_id>/', robot_detail, name='robot-detail'),
    path('requests/', connection_requests, name='connection-requests'),
]