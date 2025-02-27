from django.db import models
from django.contrib.auth.models import User

class Robot(models.Model):
    name = models.CharField(max_length=100, unique=True)
    position_x = models.FloatField(default=0.0)
    position_y = models.FloatField(default=0.0)
    is_connected = models.BooleanField(default=False)
    connected_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

class ConnectionRequest(models.Model):
    robot = models.ForeignKey(Robot, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} -> {self.robot.name}"