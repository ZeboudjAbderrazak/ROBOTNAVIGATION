from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Robot, ConnectionRequest
from .serializers import RobotSerializer, ConnectionRequestSerializer, UserSerializer
from django.contrib.auth.models import User

# Robot CRUD Views
class RobotList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        robots = Robot.objects.all()
        serializer = RobotSerializer(robots, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RobotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RobotDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, robot_id):
        try:
            robot = Robot.objects.get(id=robot_id)
        except Robot.DoesNotExist:
            return Response({'error': 'Robot not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = RobotSerializer(robot)
        return Response(serializer.data)

    def put(self, request, robot_id):
        try:
            robot = Robot.objects.get(id=robot_id)
        except Robot.DoesNotExist:
            return Response({'error': 'Robot not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = RobotSerializer(robot, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, robot_id):
        try:
            robot = Robot.objects.get(id=robot_id)
        except Robot.DoesNotExist:
            return Response({'error': 'Robot not found'}, status=status.HTTP_404_NOT_FOUND)
        robot.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# User CRUD Views
class UserList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Connection Request Views
class RequestConnection(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, robot_id):
        try:
            robot = Robot.objects.get(id=robot_id)
        except Robot.DoesNotExist:
            return Response({'error': 'Robot not found'}, status=status.HTTP_404_NOT_FOUND)

        if ConnectionRequest.objects.filter(robot=robot, user=request.user).exists():
            return Response({'error': 'Connection request already sent'}, status=status.HTTP_400_BAD_REQUEST)

        connection_request = ConnectionRequest(robot=robot, user=request.user)
        connection_request.save()
        return Response({'message': 'Connection request sent'}, status=status.HTTP_201_CREATED)

class ApproveConnection(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, request_id):
        try:
            connection_request = ConnectionRequest.objects.get(id=request_id)
        except ConnectionRequest.DoesNotExist:
            return Response({'error': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)

        connection_request.is_approved = True
        connection_request.save()

        robot = connection_request.robot
        robot.is_connected = True
        robot.connected_user = connection_request.user
        robot.save()

        return Response({'message': 'Connection approved'}, status=status.HTTP_200_OK)