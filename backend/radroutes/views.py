from contextlib import nullcontext
from django.shortcuts import render
from django.db.models import Q
from guardian.shortcuts import assign_perm
from rest_framework import mixins, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
    GenericAPIView,
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
from .models import (
    Climb,
    User,
    Book,
    Face,
    Area,
    UserLibrary,
    BookReview,
    Feature,
    AreaEditPermissions,
)
from .permissions import (
    ClimbPermissions,
    FacePermissions,
    FeaturePermissions,
    AreaPermissions,
    BookPermissions,
)

# Create your views here.


class UserListView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    lookup_field = "username"
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserLogout(APIView):
    """Logs out User"""

    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


# guidebookstuff
class CreateListAllClimbs(ListCreateAPIView):
    """
    adds the ability to list and create climb
    """

    permission_classes = [ClimbPermissions]

    serializer_class = ClimbSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        assign_perm("delete_message", self.request.user, instance)

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Climb.objects.all()
        else:
            if not self.request.user.is_authenticated:
                return Climb.objects.filter(
                    Q(face_id__feature_id__area_id__book_id__listed=True),
                    Q(face_id__feature_id__area_id__book_id__public=True),
                )
            else:
                b = Climb.objects.raw(
                    "SELECT * FROM radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book NATURAL JOIN radroutes_area NATURAL JOIN radroutes_Feature NATURAL JOIN radroutes_FACE NATURAL JOIN radroutes_climb WHERE username=%s",
                    [self.request.user.username],
                )
                q = Climb.objects.filter(
                    Q(face_id__feature_id__area_id__book_id__author=self.request.user)
                    | (
                        Q(face__id__feature_id__area_id__book_id__public=True)
                        & Q(face__id__feature_id__area_id__book_id__listed=True)
                    )
                )
                return b.union(q)


class RetrieveUpdateDestroyAllClimb(RetrieveUpdateDestroyAPIView):
    """
    access a single climb, or update or destroy
    """

    permission_classes = [ClimbPermissions]

    serializer_class = ClimbSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Climb.objects.all()
        else:
            if not self.request.user.is_authenticated:
                return Climb.objects.filter(
                    face_id__feature_id__area_id__book_id__public=True
                )
            else:
                b = Climb.objects.raw(
                    "SELECT * FROM radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book NATURAL JOIN radroutes_area NATURAL JOIN radroutes_Feature NATURAL JOIN radroutes_FACE NATURAL JOIN radroutes_climb WHERE username=%s",
                    [self.request.user.username],
                )
                q = Climb.objects.filter(
                    Q(face_id__feature_id__area_id__book_id__author=self.request.user)
                    | Q(face__id__feature_id__area_id__book_id__public=True),
                )
                return b.union(q)


class CreateListAllFaces(ListCreateAPIView):
    """
    adds the ability to list and create climb
    """

    permission_classes = [FacePermissions]

    serializer_class = FaceSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Face.objects.all()
        else:
            if not self.request.user.is_authenticated:
                return Face.objects.filter(
                    Q(feature_id__area_id__book_id__listed=True),
                    Q(feature_id__area_id__book_id__public=True),
                )
            else:
                b = Face.objects.raw(
                    "SELECT * FROM radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book NATURAL JOIN radroutes_area NATURAL JOIN radroutes_Feature NATURAL JOIN radroutes_FACE WHERE username=%s",
                    [self.request.user.username],
                )
                q = Face.objects.filter(
                    Q(feature_id__area_id__book_id__author=self.request.user)
                    | (
                        Q(feature_id__area_id__book_id__public=True)
                        & Q(feature_id__area_id__book_id__listed=True)
                    )
                )
                return b.union(q)


class RetrieveUpdateDestroyAllFace(RetrieveUpdateDestroyAPIView):
    """
    access a single climb, or update or destroy
    """

    permission_classes = [FacePermissions]

    serializer_class = FaceSerializer
    queryset = Face.objects.all()

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Face.objects.all()
        else:
            if not self.request.user.is_authenticated:
                return Face.objects.filter(feature_id__area_id__book_id__public=True)
            else:
                b = Face.objects.raw(
                    "SELECT * FROM radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book NATURAL JOIN radroutes_Area NATURAL JOIN radroutes_Feature NATURAL JOIN radroutes_FACE WHERE username=%s",
                    [self.request.user.username],
                )
                q = Face.objects.filter(
                    Q(feature_id__area_id__book_id__author=self.request.user)
                    | Q(feature_id__area_id__book_id__public=True),
                )
                return b.union(q)


class CreateListAllFeatures(ListCreateAPIView):
    """
    adds the ability to list and create climb
    """

    permission_classes = [FeaturePermissions]

    serializer_class = FeatureSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Feature.objects.all()
        else:
            if not self.request.user.is_authenticated:
                return Feature.objects.filter(
                    Q(area_id__book_id__listed=True),
                    Q(area_id__book_id__public=True),
                )
            else:
                b = Feature.objects.raw(
                    "SELECT * FROM radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book NATURAL JOIN radroutes_area NATURAL JOIN radroutes_Feature WHERE username=%s",
                    [self.request.user.username],
                )
                q = Feature.objects.filter(
                    Q(area_id__book_id__author=self.request.user)
                    | (
                        Q(area_id__book_id__public=True)
                        & Q(area_id__book_id__listed=True)
                    )
                )
                return b.union(q)


class RetrieveUpdateDestroyAllFeature(RetrieveUpdateDestroyAPIView):
    """
    access a single climb, or update or destroy
    """

    permission_classes = [FeaturePermissions]

    serializer_class = FeatureSerializer
    queryset = Feature.objects.all()

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Feature.objects.all()
        else:
            if not self.request.user.is_authenticated:
                return Feature.objects.filter(area_id__book_id__public=True)
            else:
                b = Feature.objects.raw(
                    "SELECT * FROM radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book NATURAL JOIN radroutes_area NATURAL JOIN radroutes_Feature WHERE username=%s",
                    [self.request.user.username],
                )
                q = Feature.objects.filter(
                    Q(area_id__book_id__author=self.request.user)
                    | Q(area_id__book_id__public=True),
                )
                return b.union(q)


class CreateListAllAreas(ListCreateAPIView):
    """
    adds the ability to list and create climb
    """

    permission_classes = [AreaPermissions]

    serializer_class = AreaSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Area.objects.all()
        else:
            if not self.request.user.is_authenticated:
                return Area.objects.filter(
                    Q(book_id__listed=True),
                    Q(book_id__public=True),
                )
            else:
                b = Area.objects.raw(
                    "SELECT * FROM radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book NATURAL JOIN radroutes_Area WHERE username=%s",
                    [self.request.user.username],
                )
                q = Area.objects.filter(
                    Q(book_id__author=self.request.user)
                    | (Q(book_id__public=True) & Q(book_id__listed=True))
                )
                return b.union(q)


class RetrieveUpdateDestroyAllArea(RetrieveUpdateDestroyAPIView):
    """
    access a single climb, or update or destroy
    """

    permission_classes = [AreaPermissions]

    serializer_class = AreaSerializer
    queryset = Area.objects.all()

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Area.objects.all()
        else:
            if not self.request.user.is_authenticated:
                return Area.objects.filter(book_id__public=True)
            else:
                b = Area.objects.raw(
                    "SELECT * FROM radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book NATURAL JOIN radroutes_area WHERE username=%s",
                    [self.request.user.username],
                )
                q = Area.objects.filter(
                    Q(book_id__author=self.request.user) | Q(book_id__public=True),
                )
                return b.union(q)

class CreateListAllBooks(ListCreateAPIView):
    """
    adds the ability to list and create climb
    """

    serializer_class = BookSerializer

    permission_classes = [BookPermissions]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Book.objects.all()
        else:
            if not self.request.user.is_authenticated:
                return Book.objects.filter(Q(listed=True))
            else:
                b = Book.objects.raw(
                    "SELECT * FROM radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book WHERE username=%s",
                    [self.request.user.username],
                )
                q = Book.objects.filter(Q(author=self.request.user) | Q(listed=True))
                return b.union(q)


class ListUserLibrary(ListAPIView):
    serializer_class = BookSerializer
    permission_classes = [BookPermissions]

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Book.objects.filter(Q(listed=True), Q(public=True))
        else:
            return Book.objects.raw(
                "SELECT * FROM radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book WHERE username=%s",
                [self.request.user.username],
            )


class RetrieveUpdateDestroyAllBook(RetrieveUpdateDestroyAPIView):
    """
    access a single climb, or update or destroy
    """

    serializer_class = BookSerializer

    permission_classes = [BookPermissions]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Book.objects.all()
        else:
            if not self.request.user.is_authenticated:
                return Book.objects.filter(public=True)
            else:
                b = Book.objects.raw(
                    "SELECT * FROM radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book WHERE username=%s",
                    [self.request.user.username],
                )
                q = Book.objects.filter(Q(author=self.request.user) | Q(public=True))
                return b.union(q)


#
# Ideally these will allow shortcutting the permissions to prevent extra queries
# Currently permissions need to be checked on each climb object


class ListFeatureClimbsById(GenericAPIView, mixins.ListModelMixin):
    """retrieve all climbs in an area by the areaID"""

    permission_classes = [ClimbPermissions]

    def get_queryset(self):
        return Climb.objects.filter(face_id__feature_id=self.kwargs["feature_id"])

    serializer_class = ClimbSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ListAreaClimbsById(GenericAPIView, mixins.ListModelMixin):
    """retrieve all climbs in an area by the areaID"""

    permission_classes = [ClimbPermissions]

    def get_queryset(self):
        return Climb.objects.filter(face_id__feature_id__area_id=self.kwargs["area_id"])

    serializer_class = ClimbSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ListFaceClimbsById(GenericAPIView, mixins.ListModelMixin):
    """retrieve all climbs on a face by the areaID"""

    permission_classes = [ClimbPermissions]

    def get_queryset(self):
        return Climb.objects.filter(face_id=self.kwargs["face_id"])

    serializer_class = ClimbSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ListBookClimbsById(GenericAPIView, mixins.ListModelMixin):
    """Retrieve all climbs in a book by the bookID"""

    permission_classes = [ClimbPermissions]

    def get_queryset(self):
        return Climb.objects.filter(
            face_id__feature_id__area_id__book_id=self.kwargs["book_id"]
        )

    serializer_class = ClimbSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ListBookAreasById(ListCreateAPIView):
    """get areas given a book"""

    permission_classes = [AreaPermissions]

    serializer_class = AreaSerializer

    def get_queryset(self):
        return Area.objects.filter(book_id=self.kwargs["book_id"])


class ListAreaFeaturesById(ListCreateAPIView):
    """get features given an area"""

    permission_classes = [FeaturePermissions]

    serializer_class = FeatureSerializer

    def get_queryset(self):
        return Feature.objects.filter(area_id=self.kwargs["area_id"])


class ListCreateBookReviewsByBook(ListCreateAPIView):

    serializer_class = BookReviewSerializer

    def get_queryset(self):
        return BookReview.objects.filter(book_id=self.kwargs["book_id"])
