from django.urls import path
from .views import RobotList, RobotDetail, UserList, UserDetail, RequestConnection, ApproveConnection

urlpatterns = [
    path('robots/', RobotList.as_view(), name='robot-list'),
    path('robots/<int:robot_id>/', RobotDetail.as_view(), name='robot-detail'),
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:user_id>/', UserDetail.as_view(), name='user-detail'),
    path('robots/<int:robot_id>/request_connection/', RequestConnection.as_view(), name='request-connection'),
    path('requests/<int:request_id>/approve/', ApproveConnection.as_view(), name='approve-connection'),
]