from django.contrib.gis.db import models
from core.models import User


class LocalTrip(models.Model):
    name = models.CharField(max_length=100)
    geolocation = models.PointField()
    start_date = models.DateField()
    end_date = models.DateField()
    hotel = models.ForeignKey("Hotel", on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "local_trip"
        verbose_name = "Local Trip"

    def __str__(self):
        return self.name


class Hotel(models.Model):
    name = models.CharField(max_length=100)
    geolocation = models.PointField()
    location_name = models.CharField(max_length=100)
    description = models.TextField()
    room_available = models.BooleanField(default=True)  # type: ignore
    photo = models.ImageField(upload_to="hotel_photos", null=True, blank=True)
    price_per_night = models.FloatField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "hotel"
        verbose_name = "Hotel"

    def __str__(self):
        return self.name


class Destination(models.Model):
    name = models.CharField(max_length=100)
    geolocation = models.PointField()
    description = models.TextField()
    category = models.ForeignKey(
        "DestinationCategory",
        on_delete=models.SET_NULL,
        null=True,
    )
    photo = models.ImageField(upload_to="destination_photos", null=True, blank=True)
    address = models.CharField(max_length=1000, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "destination"
        verbose_name = "Destination"

    def __str__(self):
        return self.name


class DestinationCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "destination_category"
        verbose_name = "Destination Category"

    def __str__(self):
        return self.name
