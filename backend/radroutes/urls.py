from django.urls import path

from .views import (
    CreateListAllClimbs,
    RetrieveUpdateDestroyAllClimb,
    ListAreaClimbsById,
)

urlpatterns = [
    path("climb/", CreateListAllClimbs.as_view()),
    path("climb/<int:pk>/", RetrieveUpdateDestroyAllClimb.as_view()),
    path("<int:area_id>/climbs/", ListAreaClimbsById.as_view())
]
