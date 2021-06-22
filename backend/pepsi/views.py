#from typing_extensions import get_args
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import BusinessSerializer, BookingSerializer
from .models import Business, Booking

# Create your views here.


class BusinessView(viewsets.ModelViewSet):
    serializer_class = BusinessSerializer
    queryset = Business.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'location']
    Business.objects.filter()

    @action(detail=True, methods=['get'])
    def bookings(self, request, pk=None):
        #business = self.get_object()
        querySet = Booking.objects.filter(operator=pk)
        serializer = BookingSerializer(querySet)
        return Response(serializer.data)

class BookingView(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['createdDate', 'comments', 'location', 'date', 'operator']

    @action(detail=True, methods=['put', 'patch'])
    def accept(self, request, pk=None):
        booking = self.get_object()
        booking.accept_booking()
        return Response({'status': booking.status})

    @action(detail=True, methods=['put', 'patch'])
    def deny(self, request, pk=None):
        booking = self.get_object()
        booking.deny_booking()
        return Response({'status': booking.status})
