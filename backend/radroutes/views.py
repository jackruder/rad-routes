from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework import mixins, status
from rest_framework.response import Response
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)
from .serializers import (
    BookReviewSerializer,
    ClimbSerializer,
    FaceSerializer,
    FeatureSerializer,
    AreaSerializer,
    BookSerializer,
    UserSerializer,
)
from .models import Climb, User, Book, Face, Area, UserLibrary, BookReview, Feature

# Create your views here.


class UserListView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    lookup_field = "username"
    queryset = User.objects.all()
    serializer_class = UserSerializer


# guidebookstuff
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


class CreateListAllFaces(ListCreateAPIView):
    """
    adds the ability to list and create climb
    """

    serializer_class = FaceSerializer
    queryset = Face.objects.all()


class RetrieveUpdateDestroyAllFace(RetrieveUpdateDestroyAPIView):
    """
    access a single climb, or update or destroy
    """

    serializer_class = FaceSerializer
    queryset = Face.objects.all()


class CreateListAllFeatures(ListCreateAPIView):
    """
    adds the ability to list and create climb
    """

    serializer_class = FeatureSerializer
    queryset = Feature.objects.all()


class RetrieveUpdateDestroyAllFeature(RetrieveUpdateDestroyAPIView):
    """
    access a single climb, or update or destroy
    """

    serializer_class = FeatureSerializer
    queryset = Feature.objects.all()


class CreateListAllAreas(ListCreateAPIView):
    """
    adds the ability to list and create climb
    """

    serializer_class = AreaSerializer
    queryset = Area.objects.all()


class RetrieveUpdateDestroyAllArea(RetrieveUpdateDestroyAPIView):
    """
    access a single climb, or update or destroy
    """

    serializer_class = AreaSerializer
    queryset = Area.objects.all()


class CreateListAllBooks(ListCreateAPIView):
    """
    adds the ability to list and create climb
    """

    serializer_class = BookSerializer
    queryset = Book.objects.all()


class RetrieveUpdateDestroyAllBook(RetrieveUpdateDestroyAPIView):
    """
    access a single climb, or update or destroy
    """

    serializer_class = BookSerializer
    queryset = Book.objects.all()


class ListFeatureClimbsById(GenericAPIView, mixins.ListModelMixin):
    """retrieve all climbs in an area by the areaID"""

    def get_queryset(self):
        return Climb.objects.filter(face_id__feature_id=self.kwargs["feature_id"])

    serializer_class = ClimbSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ListAreaClimbsById(GenericAPIView, mixins.ListModelMixin):
    """retrieve all climbs in an area by the areaID"""

    def get_queryset(self):
        return Climb.objects.filter(face_id__feature_id__area_id=self.kwargs["area_id"])

    serializer_class = ClimbSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ListFaceClimbsById(GenericAPIView, mixins.ListModelMixin):
    """retrieve all climbs on a face by the areaID"""

    def get_queryset(self):
        return Climb.objects.filter(face_id=self.kwargs["face_id"])

    serializer_class = ClimbSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ListBookClimbsById(GenericAPIView, mixins.ListModelMixin):
    """Retrieve all climbs in a book by the bookID"""

    def get_queryset(self):
        return Climb.objects.filter(
            face_id__feature_id__area_id__book_id=self.kwargs["book_id"]
        )

    serializer_class = ClimbSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ListBookAreasById(ListCreateAPIView):
    """get areas given a book"""

    serializer_class = AreaSerializer

    def get_queryset(self):
        return Area.objects.filter(book_id=self.kwargs["book_id"])


class ListAreaFeaturesById(ListCreateAPIView):
    """get features given an area"""

    serializer_class = FeatureSerializer

    def get_queryset(self):
        return Feature.objects.filter(area_id=self.kwargs["area_id"])


class ListCreateBookReviewsByBook(ListCreateAPIView):
    serializer_class = BookReviewSerializer

    def get_queryset(self):
        return BookReview.objects.filter(book_id=self.kwargs["book_id"])
