from rest_framework.viewsets import ModelViewSet

from .models import Destination, Hotel, LocalTrip
from .serializers import (DestinationSerializer, HotelSerializer,
                          LocalTripSerializer)


# Create your views here.
class LocalTripView(ModelViewSet):
    queryset = LocalTrip.objects.all()
    serializer_class = LocalTripSerializer


class HotelView(ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


class DestinationView(ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
