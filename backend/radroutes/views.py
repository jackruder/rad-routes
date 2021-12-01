from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import ClimbSerializer
from .models import Climb, User, Book, Face, Area, UserLibrary, BookReview, Feature

# Create your views here.


class CreateListAllClimbs(ListCreateAPIView):
    """
    adds the ability to list and create climb
    """

    serializer_class = ClimbSerializer
    queryset = Climb.objects.all()


class RetrieveUpdateDestroyAllClimb(RetrieveUpdateDestroyAPIView):
    """
    access a single climb, or update or destroy
    """

    serializer_class = ClimbSerializer
    queryset = Climb.objects.all()


class ListAreaClimbsById(GenericAPIView, mixins.ListModelMixin):
    """retrieve all climbs in an area by the areaID"""

    def get_queryset(self):
        return Climb.objects.filter(area_id=self.request.data["area_id"])

    serializer_class = ClimbSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
