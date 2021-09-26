from rest_framework import serializers
from .models import Company, Booking
from django.contrib.auth.models import User


class BookingSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source="owner.username", read_only=True)

    class Meta:
        model = Booking
        fields = (
            "id",
            "createdDate",
            "comments",
            "location",
            "date",
            "operator",
            "status",
            "owner",
        )


class CompanySerializer(serializers.ModelSerializer):
    bookings = BookingSerializer(many=True, read_only=True)
    owner = serializers.CharField(source="owner.username", read_only=True)

    class Meta:
        model = Company
        fields = ("id", "name", "description", "location", "bookings", "owner")


class UserSerializer(serializers.HyperlinkedModelSerializer):
    bookings = BookingSerializer(many=True, read_only=True)
    companies = CompanySerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ("url", "id", "username", "email", "bookings", "companies")
