from typing import ItemsView
from rest_framework import serializers
from .models import Business, Booking


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'createdDate', 'comments', 'location', 'date',
                  'operator', 'status', 'owner')


class BusinessSerializer(serializers.ModelSerializer):
    bookings = BookingSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        fields = ('id', 'name', 'description', 'location', 'bookings', 'owner')
