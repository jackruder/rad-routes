from django.urls import include, path

from . import views

urlpatterns = [
    path('climbs', views.ListAreaClimbs),
    path('climb/<pk>', views.RetrieveUpdateDestroyClimb)
]
