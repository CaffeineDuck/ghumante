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
