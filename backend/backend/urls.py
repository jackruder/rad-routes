"""radroutes URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers



urlpatterns = [
    path("admin/", admin.site.urls),
    path("", TemplateView.as_view(template_name="index.html")),
    path("login", TemplateView.as_view(template_name="index.html")),
    path("signup", TemplateView.as_view(template_name="index.html")),
    path("search", TemplateView.as_view(template_name="index.html")),
    path("create", TemplateView.as_view(template_name="index.html")),

    path("climbs", TemplateView.as_view(template_name="index.html")),
    path("faces", TemplateView.as_view(template_name="index.html")),
    path("features", TemplateView.as_view(template_name="index.html")),
    path("areas", TemplateView.as_view(template_name="index.html")),
    path("books", TemplateView.as_view(template_name="index.html")),

    path("faces/<int:id>", TemplateView.as_view(template_name="index.html")),
    path("features/<int:id>", TemplateView.as_view(template_name="index.html")),
    path("areas/<int:id>", TemplateView.as_view(template_name="index.html")),
    path("books/<int:id>", TemplateView.as_view(template_name="index.html")),

    path("faces/<int:id>/climbs", TemplateView.as_view(template_name="index.html")),
    path("features/<int:id>/faces", TemplateView.as_view(template_name="index.html")),
    path("areas/<int:id>/features", TemplateView.as_view(template_name="index.html")),
    path("books/<int:id>/areas", TemplateView.as_view(template_name="index.html")),

    path("manifest.json", TemplateView.as_view(template_name="manifest.json")),
    path("api/", include('radroutes.urls'))
]
