from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import ClimbSerializer
from .models import Climb, User, Book, Face, Area, UserLibrary, BookReview, Feature

# Create your views here.


class CreateListClimbs(ListCreateAPIView):
    """
    adds the ability to list and create climb
    """

    serializer_class = ClimbSerializer
    queryset = Climb.objects.all()


class RetrieveUpdateDestroyClimb(RetrieveUpdateDestroyAPIView):
    """
    access a single climb, or update or destroy
    """
    serializer_class = ClimbSerializer
    queryset = Climb.objects.all()


class ListAreaClimbs(APIView):
    """retrieve all climbs in an area"""

    def get(self, request):
        climbs = Climb.objects.filter(area_id=request.data["area_id"])
        serializer = ClimbSerializer(climbs, many=True)
        return Response(serializer.data)
