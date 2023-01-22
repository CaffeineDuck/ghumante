from rest_framework.authtoken.serializers import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer

from .models import Destination, Hotel, LocalTrip, DestinationCategory


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

    user = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = LocalTrip
        geo_field = "geolocation"
        fields = "__all__"


class CoordinateSerializer(serializers.Serializer):
    x = serializers.FloatField(required=False)
    y = serializers.FloatField(required=False)
    range = serializers.FloatField(required=False)


class DestinationCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationCategory
        fields = "__all__"
