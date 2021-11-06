from rest_framework import serializers
from .models import Company, Booking, Message
from django.contrib.auth.models import User


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ("booking", "name", "body", "created_on")


class BookingSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source="owner.username", read_only=True)
    messages = MessageSerializer(many=True, read_only=True)

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
            "messages",
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
