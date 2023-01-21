from django.contrib.gis.db import models


# Create your models here.
class LocalTrip(models.Model):
    name = models.CharField(max_length=100)
    geolocation = models.PointField()
    start_date = models.DateField()
    end_date = models.DateField()
    hotel = models.ForeignKey("Hotel", on_delete=models.SET_NULL, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "local_trip"
        verbose_name = "Local Trip"


class Hotel(models.Model):
    name = models.CharField(max_length=100)
    geolocation = models.PointField()
    location_name = models.CharField(max_length=100)
    description = models.TextField()
    room_available = models.BooleanField(default=True)  # type: ignore

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "hotel"
        verbose_name = "Hotel"


class Destination(models.Model):
    name = models.CharField(max_length=100)
    geolocation = models.PointField()
    details = models.TextField()
    category = models.ForeignKey(
        "DestinationCategory",
        on_delete=models.SET_NULL,
        null=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "destination"
        verbose_name = "Destination"


class DestinationCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "destination_category"
        verbose_name = "Destination Category"
