from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin Interface
    path('', include('robots.urls')),  # Template URLs
    path('api/', include('robots.api_urls')),  # API URLs
]
