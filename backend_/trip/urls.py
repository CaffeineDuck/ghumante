from rest_framework import routers

from trip.views import DestinationView, HotelView, LocalTripView

router = routers.DefaultRouter()


router.register("localtrip", LocalTripView, basename="localtrip")
router.register("hotel", HotelView, basename="hotel")
router.register("destination", DestinationView, basename="destination")

urlpatterns = router.urls
