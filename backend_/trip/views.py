from rest_framework.schemas.openapi import AutoSchema
from rest_framework.viewsets import ModelViewSet
from .models import Destination, Hotel, LocalTrip
from django.contrib.gis.geos import Point
from .serializers import (
    DestinationSerializer,
    HotelSerializer,
    LocalTripSerializer,
    CoordinateSerializer,
)
from rest_framework.response import Response
from django.contrib.gis.measure import D


class LocalTripView(ModelViewSet):
    schema = AutoSchema(tags=["localtrip"])
    queryset = LocalTrip.objects.all()
    serializer_class = LocalTripSerializer


class HotelView(ModelViewSet):
    schema = AutoSchema(tags=["hotel"])
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    def list(self, request):
        """
        if no query parms are provided then every row is returned \n
            query_parms:
                x_cord : float
                y_cord : float
        """
        if not request.GET.dict():
            serializer = HotelSerializer(self.queryset, many=True)
            return Response(data=serializer.data, status=200)
        serializer = CoordinateSerializer(data=request.GET.dict())
        if serializer.is_valid():
            point = Point(*serializer.data.values())
            query_set = Hotel.objects.filter(
                geolocation__distance_lte=(point, D(km=serializer.data["range"]))
            )
            hotel_serializer = HotelSerializer(query_set, many=True)
            return Response(status=200, data=hotel_serializer.data)

        else:
            return Response(serializer.errors, status=200)


class DestinationView(ModelViewSet):
    schema = AutoSchema(tags=["destination"])
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

    def list(self, request):
        """
        if no query parms are provided then every row is returned \n
            query_parms:
                x_cord : float
                y_cord : float
        """
        if not request.GET.dict():
            serializer = DestinationSerializer(self.queryset, many=True)
            return Response(data=serializer.data, status=200)

        serializer = CoordinateSerializer(data=request.GET.dict())
        if serializer.is_valid():
            point = Point(*serializer.data.values())
            query_set = Destination.objects.filter(
                geolocation__distance_lte=(point, D(km=serializer.data["range"]))
            )
            hotel_serializer = HotelSerializer(query_set, many=True)
            return Response(status=200, data=hotel_serializer.data)

        else:
            return Response(serializer.errors, status=200)
