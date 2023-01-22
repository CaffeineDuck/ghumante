from django.contrib.gis.geos import Point
from rest_framework.authtoken.serializers import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer

from .models import Destination, Hotel, LocalTrip


class DestinationSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Destination
        geo_field = "geolocation"
        fields = "__all__"


class HotelSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Hotel
        geo_field = "geolocation"
        fields = "__all__"


class LocalTripSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = LocalTrip
        geo_field = "geolocation"
        fields = "__all__"


class CoordinateSerializer(serializers.Serializer):
    x_cord = serializers.FloatField(required=False)
    y_cord = serializers.FloatField(required=False)
    range = serializers.FloatField(required=False)
