from rest_framework.authtoken.serializers import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from core.models import User

from .models import Destination, Hotel, LocalTrip, DestinationCategory


class HotelSerializer(GeoFeatureModelSerializer):
    photo = serializers.ImageField(max_length=None, use_url=False)

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


class DestinationSerializer(GeoFeatureModelSerializer):
    photo = serializers.ImageField(max_length=None, use_url=False)

    class Meta:
        model = Destination
        geo_field = "geolocation"
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password",)
