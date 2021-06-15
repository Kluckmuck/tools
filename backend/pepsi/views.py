#from typing_extensions import get_args
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import viewsets, filters
from .serializers import BusinessSerializer, BookingSerializer
from .models import Business, Booking

# Create your views here.


class BusinessView(viewsets.ModelViewSet):
    serializer_class = BusinessSerializer
    queryset = Business.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'location']

class BookingView(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['createdDate', 'comments', 'location', 'date', 'operator']
