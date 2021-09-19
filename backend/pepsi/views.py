from django.shortcuts import render
from rest_framework import viewsets, filters, status
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
        querySet = Booking.objects.filter(operator=pk)
        serializer = BookingSerializer(querySet)
        return Response(serializer.data)


class BookingView(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['createdDate', 'comments', 'location', 'date', 'operator']

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED,
    #                     headers=headers)

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)
    #     serializer.save()

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
