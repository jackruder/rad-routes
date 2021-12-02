from django.urls import path

from .views import (
    CreateListAllClimbs,
    RetrieveUpdateDestroyAllClimb,
    ListAreaClimbsById,
    ListFaceClimbsById,
    ListFeatureClimbsById,
    ListBookClimbsById,
)

urlpatterns = [
    path("climbs/", CreateListAllClimbs.as_view()),
    path("climbs/<int:pk>/", RetrieveUpdateDestroyAllClimb.as_view()),
    path("areas/<int:area_id>/climbs/", ListAreaClimbsById.as_view()),
    path("faces/<int:face_id>/climbs/", ListFaceClimbsById.as_view()),
    path("features/<int:feature_id>/climbs/", ListFeatureClimbsById.as_view()),
    path("books/<int:book_id>/climbs/", ListBookClimbsById.as_view()),
]
