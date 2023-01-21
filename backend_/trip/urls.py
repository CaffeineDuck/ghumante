from rest_framework import routers

from trip.views import DestinationView, HotelView, LocalTripView

router = routers.DefaultRouter()


router.register("localtrip", LocalTripView)
router.register("hotel", HotelView)
router.register("destination", DestinationView)

urlpatterns = router.urls
