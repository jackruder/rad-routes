from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token


from .views import (
    CreateListAllClimbs,
    CreateListAllFaces,
    CreateListAllFeatures,
    CreateListAllAreas,
    CreateListAllBooks,
    RetrieveUpdateDestroyAllClimb,
    RetrieveUpdateDestroyAllFace,
    RetrieveUpdateDestroyAllFeature,
    RetrieveUpdateDestroyAllArea,
    RetrieveUpdateDestroyAllBook,
    ListAreaClimbsById,
    ListFaceClimbsById,
    ListFeatureClimbsById,
    ListBookClimbsById,
    UserCreateListView,
    UserIdRetrieveUpdateDestroyView,
    UserNameRetrieveUpdateDestroyView,
    ListBookAreasById,
    ListAreaFeaturesById,
    ListFeatureFacesById,
    ListCreateBookReviewsByBook,
    UserLogout,
    ListUserLibrary,
    ListOwnBooks,
)

urlpatterns = [
    # lists of objects (post to create, get to retrieve list)
    path("users/", UserCreateListView.as_view()),
    path("climbs/", CreateListAllClimbs.as_view()),
    path("faces/", CreateListAllFaces.as_view()),
    path("features/", CreateListAllFeatures.as_view()),
    path("areas/", CreateListAllAreas.as_view()),
    path("books/", CreateListAllBooks.as_view()),
    # individual objects (put to update, get for individual object)
    path("users/<int:id>/", UserIdRetrieveUpdateDestroyView().as_view()),
    path("users/<str:username>/", UserNameRetrieveUpdateDestroyView().as_view()),
    path("climbs/<int:pk>/", RetrieveUpdateDestroyAllClimb.as_view()),
    path("faces/<int:pk>/", RetrieveUpdateDestroyAllFace.as_view()),
    path("features/<int:pk>/", RetrieveUpdateDestroyAllFeature.as_view()),
    path("areas/<int:pk>/", RetrieveUpdateDestroyAllArea.as_view()),
    path("books/<int:pk>/", RetrieveUpdateDestroyAllBook.as_view()),
    # get climbs by id
    path("areas/<int:area_id>/climbs/", ListAreaClimbsById.as_view()),
    path("faces/<int:face_id>/climbs/", ListFaceClimbsById.as_view()),
    path("features/<int:feature_id>/climbs/", ListFeatureClimbsById.as_view()),
    path("books/<int:book_id>/climbs/", ListBookClimbsById.as_view()),
    # list of areas from books
    path("books/<int:book_id>/areas/", ListBookAreasById.as_view()),
    # list of features from areas
    path("areas/<int:area_id>/features/", ListAreaFeaturesById.as_view()),
    # list of faces from features
    path("features/<int:feature_id>/faces/", ListFeatureFacesById.as_view()),
    # reviewws
    path("books/<int:book_id>/reviews/", ListCreateBookReviewsByBook.as_view()),
    # token authorization
    path("authorization/", obtain_auth_token),
    path("login/", include("rest_framework.urls")),
    path("library/", ListUserLibrary.as_view()),
    path(
        "owned/", ListOwnBooks.as_view()
    ),  # Get books that the user owns, i.e. book.author = user
]
