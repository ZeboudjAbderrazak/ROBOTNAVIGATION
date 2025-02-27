# robots/api_urls.py
from django.urls import path
from .api_views import RobotList, RobotDetail, RequestConnection, ApproveConnection, UpdateRobotPosition

urlpatterns = [
    path('robots/', RobotList.as_view(), name='api-robot-list'),
    path('robots/<int:robot_id>/', RobotDetail.as_view(), name='api-robot-detail'),
    path('robots/<int:robot_id>/request_connection/', RequestConnection.as_view(), name='api-request-connection'),
    path('requests/<int:request_id>/approve/', ApproveConnection.as_view(), name='api-approve-connection'),
    path('robots/<int:robot_id>/update_position/', UpdateRobotPosition.as_view(), name='api-update-robot-position'),
]