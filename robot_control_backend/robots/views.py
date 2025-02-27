# robots/views.py
from django.shortcuts import render
from .models import Robot, ConnectionRequest

def robot_list(request):
    robots = Robot.objects.all()
    return render(request, 'robots/robot_list.html', {'robots': robots})

def robot_detail(request, robot_id):
    try:
        robot = Robot.objects.get(id=robot_id)
    except Robot.DoesNotExist:
        return render(request, 'robots/error.html', {'error': 'Robot not found'})
    return render(request, 'robots/robot_detail.html', {'robot': robot})

def connection_requests(request):
    requests = ConnectionRequest.objects.all()
    return render(request, 'robots/connection_requests.html', {'requests': requests})