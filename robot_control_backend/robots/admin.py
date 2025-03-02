from django.contrib import admin
from .models import Robot, ConnectionRequest

admin.site.register(Robot)
admin.site.register(ConnectionRequest)