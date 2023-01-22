# Create your views here.
from core.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from rest_framework.response import Response
from core.serializers import UserResponseSerializer
from firebase.client import FirebaseClient
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

firebase_client = FirebaseClient()


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        token = request.data.get("token", None)
        if token is None:
            return Response({"error": "Token is required"}, status=400)
        user = firebase_client.verify_id_token(token)
        if not user:
            return Response({"error": "Invalid token"}, status=400)
        created_user = User.objects.get_or_create(phone_number=user["phone_number"])[0]
        token, _ = Token.objects.get_or_create(user=created_user)
        return Response({"token": token.key}, status=200)


class UserProfileAPIView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = UserResponseSerializer(request.user)
        return Response(data=serializer.data, status=201)
