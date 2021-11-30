from rest_framework import serializers
from .models import *


class ClimbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Climb
        fields = (
            "climb_id",
            "author_email",
            "climb_name",
            "climb_type",
            "face_id",
            "grade",
            "quality",
            "height",
            "description",
        )


class FaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Face
        fields = (
            "face_id",
            "face_name",
            "face_description",
            "feature_id",
            "image",  # WHAT DO WE DOOO
        )


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = (
            "feature_id",
            "feature_name",
            "feature_description",
            "gps",
            "location",
            "area_id",
        )


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ("area_id", "area_name", "area_quality", "area_description", "book_id")


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = (
            "book_id",
            "book_name",
            "book_description",
            "author",
            "public",
            "listed",
            "quality_max",
            "grade_hist",
        )
