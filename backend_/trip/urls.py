from rest_framework import routers
from django.urls import path

from trip.views import (
    DestinationView,
    HotelView,
    LocalTripView,
    DestionationCategoryViewSet,
    UserViewSet,
)

router = routers.DefaultRouter(trailing_slash=False)


# router.register("localtrip", LocalTripView, basename="localtrip")
router.register("hotel", HotelView, basename="hotel")
router.register("destination", DestinationView, basename="destination")
router.register(
    "destination-category", DestionationCategoryViewSet, basename="destination"
)
router.register("user", UserViewSet, basename="destination")

urlpatterns = router.urls
urlpatterns += [
    path("localtrip/", LocalTripView.as_view(), name="localtrip"),
]
