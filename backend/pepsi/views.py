#from typing_extensions import get_args
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import viewsets, filters
from .serializers import BusinessSerializer
from .models import Business

# Create your views here.


class BusinessView(viewsets.ModelViewSet):
    serializer_class = BusinessSerializer
    queryset = Business.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'location']
