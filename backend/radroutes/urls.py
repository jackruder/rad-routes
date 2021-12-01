from django.urls import path

from . import views

urlpatterns = [
    path("climbs/", views.CreateListAllClimbs.as_view()),
    path("climb/<pk>", views.RetrieveUpdateDestroyAllClimb.as_view()),
]
