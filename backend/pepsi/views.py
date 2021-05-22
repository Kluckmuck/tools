from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BusinessSerializer
from .models import Business

# Create your views here.


class PepsiView(viewsets.ModelViewSet):
    serializer_class = BusinessSerializer
    queryset = Business.objects.all()
