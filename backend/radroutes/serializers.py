from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import *


class ClimbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Climb
        fields = (
            "climb_id",
            "climb_name",
            "climb_type",
            "face",
            "grade",
            "quality",
            "height",
            "description",
            "image",
        )


class FaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Face
        fields = (
            "face_id",
            "face_name",
            "face_description",
            "feature",
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
            "area",
        )


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ("area_id", "area_name", "area_quality", "area_description", "book")


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


class BookPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = (
            "book_name",
            "book_description",
            "public",
            "listed",
            "quality_max",
            "grade_hist",
        )


class UserSignupSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(), message="This email is already in use."
            )
        ],
    )
    username = serializers.CharField(
        required=True,
        max_length=20,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(), message="This username is already taken."
            )
        ],
    )

    password = serializers.CharField(min_length=7, write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
            is_guide=validated_data["is_guide"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            info_private=validated_data["info_private"],
        )
        return user

    def createSuper(self, validated_data):
        user = User.objects.create_superuser(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
            is_guide=validated_data["is_guide"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            info_private=validated_data["info_private"],
        )
        return user

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "is_guide",
            "info_private",
        )


class UserPrivateSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "username"


class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("username", "email", "first_name", "last_name")


class BookReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookReview
        fields = ("reviewer", "book_id", "review_body", "rating")
