from rest_framework import serializers
from .models import Robot, ConnectionRequest

class RobotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Robot
        fields = ['id', 'name', 'position_x', 'position_y', 'is_connected', 'connected_user']

class ConnectionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnectionRequest
        fields = ['id', 'robot', 'user', 'is_approved']