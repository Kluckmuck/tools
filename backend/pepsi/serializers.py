from rest_framework import serializers
from .models import Business, Booking
from django.contrib.auth.models import User


class BookingSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.username', read_only=True)

    class Meta:
        model = Booking
        fields = ('id', 'createdDate', 'comments', 'location', 'date',
                  'operator', 'status', 'owner')


class BusinessSerializer(serializers.ModelSerializer):
    bookings = BookingSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        fields = ('id', 'name', 'description', 'location', 'bookings', 'owner')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'email')
