from rest_framework import serializers
from .models import User


class UserResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password",)
