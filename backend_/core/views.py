# Create your views here.
from core.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from firebase.client import FirebaseClient
from rest_framework.authtoken.models import Token


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        token = request.data.get("token", None)
        if token is None:
            return Response({"error": "Token is required"}, status=400)
        firebase_client = FirebaseClient()
        user = firebase_client.verify_id_token(token)
        if not user:
            return Response({"error": "Invalid token"}, status=400)
        created_user = User.objects.get_or_create(phone_number=user["phone_number"])[0]
        token, _ = Token.objects.get_or_create(user=created_user)
        return Response({"token": token.key}, status=200)
