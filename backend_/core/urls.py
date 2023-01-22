from django.urls import path

from .views import CustomAuthToken, UserProfileAPIView

urlpatterns = [
    path("login", CustomAuthToken.as_view(), name="login"),
    path("user", UserProfileAPIView.as_view(), name="user_profile"),
]
