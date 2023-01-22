from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.schemas.openapi import AutoSchema
from rest_framework.viewsets import ModelViewSet
from .models import Destination, Hotel, LocalTrip, DestinationCategory
from django.contrib.gis.geos import Point
from .serializers import (
    DestinationSerializer,
    HotelSerializer,
    LocalTripSerializer,
    CoordinateSerializer,
    DestinationCategorySerializer,
)
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.gis.measure import D
from .paginations import CustomPagination


class LocalTripView(ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    schema = AutoSchema(tags=["localtrip"])
    queryset = LocalTrip.objects.all()
    serializer_class = LocalTripSerializer

    def create(self, request):
        serializer = LocalTripSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, 200)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk):
        try:
            query_set = LocalTrip.objects.get(user=request.user, pk=pk)
            serializer = LocalTripSerializer(query_set)
            return Response(serializer.data, 200)
        except LocalTrip.DoesNotExist:
            return Response({"error": "LocalTrip not found"}, status=404)

    def list(self, request):
        query_set = LocalTrip.objects.filter(user=request.user)
        serializer = LocalTripSerializer(query_set, many=True)
        return Response(serializer.data, 200)

    def partial_update(self, request, pk):
        query_set = self.get_object()
        serializer = LocalTripSerializer(
            query_set, data=request.data, context={"request": request}, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 200)
        return Response(serializer.errors, status=400)

    def destory(self, request, pk):
        query_set = self.get_object()
        query_set.delete()
        return Response({"message": "LocalTrip deleted successfully"}, 200)


# class HotelView(ModelViewSet):
#     schema = AutoSchema(tags=["hotel"])
#     queryset = Hotel.objects.all()
#     serializer_class = HotelSerializer
#     pagination_class = CustomPagination
#
#     def list(self, request):
#         """
#         if no query parms are provided then every row is returned \n
#             query_parms:
#                 x : float
#                 y : float
#                 range : float (in km)
#         """
#
#         if not (
#             "x" in request.GET.dict()
#             and "y" in request.GET.dict()
#             and "range" in request.GET.dict()
#         ):
#             serializer = HotelSerializer(self.queryset, many=True)
#             return Response(data=serializer.data, status=200)
#         serializer = CoordinateSerializer(data=request.GET.dict())
#         if serializer.is_valid():
#             point = Point(serializer.data["y"], serializer.data["x"])
#             query_set = Hotel.objects.filter(
#                 geolocation__distance_lte=(point, D(km=serializer.data["range"]))
#             )
#             hotel_serializer = HotelSerializer(query_set, many=True)
#             return Response(status=200, data=hotel_serializer.data)
#
#         else:
#             return Response(serializer.errors, status=200)
#
#     @action(detail=False, methods=["get"])
#     def get_random_hotel(self, request):
#         hotel = Hotel.objects.all().order_by("?").first()
#         serializer = HotelSerializer(hotel)
#         return Response(serializer.data, status=200)
class HotelView(ModelViewSet):
    schema = AutoSchema(tags=["hotel"])
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = self.queryset
        if (
            "x" in self.request.GET.dict()
            and "y" in self.request.GET.dict()
            and "range" in self.request.GET.dict()
        ):
            serializer = CoordinateSerializer(data=self.request.GET.dict())
            if serializer.is_valid():
                point = Point(x=serializer.data["y"], y=serializer.data["x"])
                queryset = Hotel.objects.filter(
                    geolocation__distance_lte=(point, D(km=serializer.data["range"]))
                )
        return queryset

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def get_random_hotel(self, request):
        hotel = Hotel.objects.all().order_by("?").first()
        serializer = HotelSerializer(hotel)
        return Response(serializer.data, status=200)


# class DestinationView(ModelViewSet):
#     schema = AutoSchema(tags=["destination"])
#     queryset = Destination.objects.all()
#     serializer_class = DestinationSerializer
#     pagination_class = CustomPagination
#
#     def list(self, request):
#         """
#         if no query parms are provided then every row is returned \n
#             query_parms:
#                 x : float
#                 y : float
#                 range : float (in km)
#                 category: int (id of category)
#         """
#
#         if not (
#             "x" in request.GET.dict()
#             and "y" in request.GET.dict()
#             and "range" in request.GET.dict()
#         ):
#             self.queryset = self.queryset.all()
#             if "category" in request.GET.dict():
#                 self.queryset = self.queryset.filter(
#                     category=request.GET.dict()["category"]
#                 )
#             serializer = DestinationSerializer(self.queryset, many=True)
#             return Response(data=serializer.data, status=200)
#         serializer = CoordinateSerializer(data=request.GET.dict())
#         if serializer.is_valid():
#             point = Point(x=serializer.data["y"], y=serializer.data["x"])
#             query_set = Destination.objects.filter(
#                 geolocation__distance_lte=(point, D(km=serializer.data["range"]))
#             )
#             if "category" in request.GET.dict():
#                 query_set = query_set.filter(category=request.GET.dict()["category"])
#             destination_serializer = DestinationSerializer(query_set, many=True)
#             return Response(status=200, data=destination_serializer.data)
#
#         else:
#             return Response(serializer.errors, status=200)


class DestinationView(ModelViewSet):
    schema = AutoSchema(tags=["destination"])
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = self.queryset
        if (
            "x" in self.request.GET.dict()
            and "y" in self.request.GET.dict()
            and "range" in self.request.GET.dict()
        ):
            serializer = CoordinateSerializer(data=self.request.GET.dict())
            if serializer.is_valid():
                point = Point(x=serializer.data["y"], y=serializer.data["x"])
                queryset = Destination.objects.filter(
                    geolocation__distance_lte=(point, D(km=serializer.data["range"]))
                )
        if "category" in self.request.GET.dict():
            queryset = queryset.filter(category=self.request.GET.dict()["category"])
        return queryset

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class DestionationCategoryViewSet(ModelViewSet):
    queryset = DestinationCategory.objects.all()
    serializer_class = DestinationCategorySerializer

    schema = AutoSchema(tags=["destination-category"])
