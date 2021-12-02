from django.urls import path

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
    UserListView,
    UserRetrieveUpdateDestroyView,
)

urlpatterns = [
    #lists of objects (post to create, get to retrieve list)
    path("users/", UserListView.as_view()),
    path("climbs/", CreateListAllClimbs.as_view()),
    path("faces/", CreateListAllFaces.as_view()),
    path("features/", CreateListAllFeatures.as_view()),
    path("areas/", CreateListAllAreas.as_view()),
    path("books/", CreateListAllBooks.as_view()),
    # individual objects (put to update, get for individual object)
    path("users/<str:username>/", UserRetrieveUpdateDestroyView().as_view()),
    path("climbs/<int:pk>/", RetrieveUpdateDestroyAllClimb.as_view()),
    path("faces/<int:pk>/", RetrieveUpdateDestroyAllFace.as_view()),
    path("features/<int:pk>/", RetrieveUpdateDestroyAllFeature.as_view()),
    path("areas/<int:pk>/", RetrieveUpdateDestroyAllArea.as_view()),
    path("books/<int:pk>/", RetrieveUpdateDestroyAllBook.as_view()),
    ##get climbs by id
    path("areas/<int:area_id>/climbs/", ListAreaClimbsById.as_view()),
    path("faces/<int:face_id>/climbs/", ListFaceClimbsById.as_view()),
    path("features/<int:feature_id>/climbs/", ListFeatureClimbsById.as_view()),
    path("books/<int:book_id>/climbs/", ListBookClimbsById.as_view()),
]
