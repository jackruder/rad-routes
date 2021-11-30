from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *

# Create your views here.


class ClimbView(viewsets.ModelViewSet):
    serializer_class = ClimbSerializer
    queryset = Climb.objects.all()
