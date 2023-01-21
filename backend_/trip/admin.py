from django.contrib import admin
from trip.models import LocalTrip, Hotel, Destination, DestinationCategory

# Register your models here.
admin.site.register(LocalTrip)
admin.site.register(Hotel)
admin.site.register(Destination)
admin.site.register(DestinationCategory)
