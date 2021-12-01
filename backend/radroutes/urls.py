from django.urls import path

from .views import (
    CreateListAllClimbs,
    RetrieveUpdateDestroyAllClimb,
    ListAreaClimbsById,
    ListFaceClimbsById,
)

urlpatterns = [
    path("climbs/", CreateListAllClimbs.as_view()),
    path("climbs/<int:pk>/", RetrieveUpdateDestroyAllClimb.as_view()),
    path("areas/<int:area_id>/climbs/", ListAreaClimbsById.as_view()),
    path("faces/<int:face_id>/climbs/", ListFaceClimbsById.as_view()),
]
