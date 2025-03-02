import os
import django

# Set up Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "robot_control_backend.settings")
django.setup()

from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

# Generate token for a user
def generate_token(username):
    try:
        user = User.objects.get(username=username)
        refresh = RefreshToken.for_user(user)
        print("Access Token:", str(refresh.access_token))
        print("Refresh Token:", str(refresh))
    except User.DoesNotExist:
        print("User not found.")

# Example: Generate token for user 'admin'
generate_token("zohir")
