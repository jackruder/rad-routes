from rest_framework import serializers
from rest_framework.validators import UniqueValidator
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


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(min_length=7)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
            is_guide=validated_data["is_guide"],
            fname=validated_data["fname"],
            lname=validated_data["lname"],
        )
        return user

    def createSuper(self, validated_data):
        user = User.objects.create_superuser(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
            is_guide=validated_data["is_guide"],
            fname=validated_data["fname"],
            lname=validated_data["lname"],
        )
        return user

    class Meta:
        model = User
        fields = ("username", "email", "password", "fname", "lname", "is_guide")


class BookReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookReview
        fields = ("book_id", "review_body", "rating")
