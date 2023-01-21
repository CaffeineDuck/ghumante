from rest_framework.schemas.openapi import AutoSchema
from rest_framework.viewsets import ModelViewSet
from .models import Destination, Hotel, LocalTrip
from .serializers import DestinationSerializer, HotelSerializer, LocalTripSerializer


class LocalTripView(ModelViewSet):
    schema = AutoSchema(tags=["localtrip"])
    queryset = LocalTrip.objects.all()
    serializer_class = LocalTripSerializer


class HotelView(ModelViewSet):
    schema = AutoSchema(tags=["hotel"])
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


class DestinationView(ModelViewSet):
    schema = AutoSchema(tags=["destination"])
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
