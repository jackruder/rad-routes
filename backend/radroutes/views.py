from contextlib import nullcontext
from django.shortcuts import render
from django.db.models import Q, Model
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
                    Q(face__feature__area__book__listed=True),
                    Q(face__feature__area__book__public=True),
                )
            else:
                b = Climb.objects.raw(
                    "With tmp as (Select * From radroutes_area NATURAL JOIN radroutes_Feature NATURAL JOIN radroutes_face Inner Join radroutes_climb ON radroutes_face.face_id = radroutes_climb.face_id), cTable As ( Select * FROM radroutes_book INNER JOIN tmp ON tmp.book_id = radroutes_book.book_id) SELECT climb_id FROM cTable NATURAL JOIN radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book UNION Select climb_id FROM cTable WHERE author_id=%s OR (public=1 AND listed=1);",
                    [self.request.user.id],
                )
                return Climb.objects.filter(climb_id__in=[x.climb_id for x in b])


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
                return Climb.objects.filter(face__feature__area__book__public=True)
            else:
                b = Climb.objects.raw(
                    "With tmp as (Select * From radroutes_area NATURAL JOIN radroutes_Feature NATURAL JOIN radroutes_face Inner Join radroutes_climb ON radroutes_face.face_id = radroutes_climb.face_id), cTable As ( Select * FROM radroutes_book INNER JOIN tmp ON tmp.book_id = radroutes_book.book_id) SELECT climb_id FROM cTable NATURAL JOIN radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book UNION Select climb_id FROM cTable WHERE author_id=%s OR public=1;",
                    [self.request.user.id],
                )
                return Climb.objects.filter(climb_id__in=[x.climb_id for x in b])


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
                    Q(feature__area__book__listed=True),
                    Q(feature__area__book__public=True),
                )
            else:
                b = Face.objects.raw(
                    "With tmp as (Select * From radroutes_area NATURAL JOIN radroutes_Feature NATURAL JOIN radroutes_face), cTable As ( Select * FROM radroutes_book INNER JOIN tmp ON tmp.book_id = radroutes_book.book_id) SELECT face_id FROM cTable NATURAL JOIN radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book UNION Select face_id FROM cTable WHERE author_id=%s OR (public=1 AND listed=1);",
                    [
                        self.request.user.id
                    ],
                )
                return Face.objects.filter(face_id__in=[x.face_id for x in b])


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
                return Face.objects.filter(feature__area__book__public=True)
            else:
                b = Face.objects.raw(
                    "With tmp as (Select * From radroutes_area NATURAL JOIN radroutes_Feature NATURAL JOIN radroutes_face), cTable As ( Select * FROM radroutes_book INNER JOIN tmp ON tmp.book_id = radroutes_book.book_id) SELECT face_id FROM cTable NATURAL JOIN radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book UNION Select face_id FROM cTable WHERE author_id=%s OR public=1;",
                    [
                        self.request.user.id
                    ],
                )
                return Face.objects.filter(face_id__in=[x.face_id for x in b])


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
                    Q(area__book__listed=True),
                    Q(area__book__public=True),
                )
            else:
                b = Feature.objects.raw(
                    "With tmp as (Select * From radroutes_area NATURAL JOIN radroutes_Feature), cTable As ( Select * FROM radroutes_book INNER JOIN tmp ON tmp.book_id = radroutes_book.book_id) SELECT feature_id FROM cTable NATURAL JOIN radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book UNION Select feature_id FROM cTable WHERE author_id=%s OR (public=1 AND listed=1);",
                    [self.request.user.id],
                )
                return Feature.objects.filter(feature_id__in=[x.feature_id for x in b])


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
                return Feature.objects.filter(area__book__public=True)
            else:
                b = Feature.objects.raw(
                    "With tmp as (Select * From radroutes_area NATURAL JOIN radroutes_Feature), cTable As ( Select * FROM radroutes_book INNER JOIN tmp ON tmp.book_id = radroutes_book.book_id) SELECT feature_id FROM cTable NATURAL JOIN radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book UNION feature_id FROM cTable WHERE author_id=%s OR public=1;",
                    [self.request.user.id],
                )
                return Feature.objects.filter(feature_id__in=[x.feature_id for x in b])


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
                    Q(book__listed=True),
                    Q(book__public=True),
                )
            else:
                b = Area.objects.raw(
                    "With cTable As ( Select * FROM radroutes_book INNER JOIN radroutes_area ON radroutes_area.book_id = radroutes_book.book_id) SELECT area_id FROM cTable NATURAL JOIN radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book UNION Select area_id FROM cTable WHERE author_id=%s OR (public=1 AND listed=1);",
                    [self.request.user.id],
                )
                return Area.objects.filter(area_id__in=[x.area_id for x in b])


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
                return Area.objects.filter(book__public=True)
            else:
                b = Area.objects.raw(
                    "With cTable As ( Select * FROM radroutes_book INNER JOIN radroutes_area ON radroutes_area.book_id = radroutes_book.book_id) SELECT area_id FROM cTable NATURAL JOIN radroutes_UserLibrary NATURAL JOIN radroutes_User UNION Select area_id FROM cTable WHERE author_id=%s OR public=1;",
                    [self.request.user.id],
                )
                return Area.objects.filter(area_id__in=[x.area_id for x in b])


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
                    "SELECT book_id FROM radroutes_book NATURAL JOIN radroutes_UserLibrary NATURAL JOIN radroutes_User UNION SELECT book_id from radroutes_book WHERE author_id=%s",
                    [self.request.user.id],
                )
                return Book.objects.filter(book_id__in=[x.book_id for x in b])


class ListUserLibrary(ListAPIView):
    serializer_class = BookSerializer
    permission_classes = [BookPermissions]

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Book.objects.filter(Q(listed=True), Q(public=True))
        else:
            b = Book.objects.raw(
                "SELECT book_id FROM radroutes_book NATURAL JOIN radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book UNION Select book_id FROM radroutes_book WHERE author_id=%s OR (public=1 AND listed=1);",
                [self.request.user.username],
            )
            return Book.objects.filter(book_id__in=[x.book_id for x in b])


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
                    "SELECT book_id FROM radroutes_book NATURAL JOIN radroutes_UserLibrary NATURAL JOIN radroutes_User NATURAL JOIN radroutes_Book UNION Select book_id FROM radroutes_book WHERE author_id=%s OR public=1;",
                    [self.request.user.id],
                )
                return Book.objects.filter(book_id__in=[x.book_id for x in b])


#
# Ideally these will allow shortcutting the permissions to prevent extra queries
# Currently permissions need to be checked on each climb object


class ListFeatureClimbsById(GenericAPIView, mixins.ListModelMixin):
    """retrieve all climbs in an area by the areaID"""

    permission_classes = [ClimbPermissions]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Climb.objects.filter(face__feature=self.kwargs["feature_id"])
        else:
            if not self.request.user.is_authenticated:
                return Climb.objects.filter(
                    Q(face__feature=self.kwargs["feature_id"]),
                    Q(face__feature__area__book__listed=True),  ##need to decide here
                    Q(face__feature__area__book__public=True),
                )
            else:
                b = Climb.objects.raw(
                    [
                        self.kwargs["feature_id"],
                        self.request.user.username,
                        self.request.user.username,
                    ],  ##TODO check escaping here
                )
                return Climb.objects.filter(pk__in=[x.pk for x in b])

    serializer_class = ClimbSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ListAreaClimbsById(GenericAPIView, mixins.ListModelMixin):
    """retrieve all climbs in an area by the areaID"""

    permission_classes = [ClimbPermissions]

    def get_queryset(self):
        return Climb.objects.filter(face__feature__area=self.kwargs["area_id"])

    serializer_class = ClimbSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ListFaceClimbsById(GenericAPIView, mixins.ListModelMixin):
    """retrieve all climbs on a face by the areaID"""

    permission_classes = [ClimbPermissions]

    def get_queryset(self):
        return Climb.objects.filter(face=self.kwargs["face_id"])

    serializer_class = ClimbSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ListBookClimbsById(GenericAPIView, mixins.ListModelMixin):
    """Retrieve all climbs in a book by the bookID"""

    permission_classes = [ClimbPermissions]

    def get_queryset(self):
        return Climb.objects.filter(face__feature__area__book_id=self.kwargs["book_id"])

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
