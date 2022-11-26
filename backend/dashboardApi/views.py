from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ComputerSerializer
from .models import Computer

# Create your views here.

class ComputersView(viewsets.ModelViewSet):
    serializer_class = ComputerSerializer
    queryset = Computer.objects.all()