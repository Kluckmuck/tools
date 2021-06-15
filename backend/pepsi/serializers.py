from rest_framework import serializers
from .models import Business, Booking

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ('id', 'name', 'description', 'location')

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('createdDate', 'comments', 'location', 'date', 'operator')
        # fields = ('comments', 'location')
