from django.core.exceptions import ValidationError
from django.db import models

DESCRIPTION_MAX_LENGTH = 5000
TITLE_MAX_LENGTH = 100
NAME_MAX_LENGTH = 200

# NOT NULL is the default! (achieved with null=False, blank=False)
# In django, the `blank=False` parameter is more akin to the "NOT NULL" property in SQL
# So the ones with nullity specified are the
# complement of the ones that would be in the raw SQL

def validate_positive(value):
    if value <= 0:
        raise ValidationError(
            f"{value} is not positive.",
            params={'value': value}
        )

def validate_star_rating(value):
    if value not in [0,1,2,3,4,5]:
        raise ValidationError(
            f"{value} is not an integer between 1 and 5 inclusive",
            params={'value': value}
        )


class User(models.Model):
    email = models.EmailField(primary_key=True)
    fname = models.TextField(null=True, blank=True, max_length=TITLE_MAX_LENGTH)
    lname = models.TextField(null=True, blank=True, max_length=TITLE_MAX_LENGTH)
    password = models.TextField(max_length=2048) # these will be hashes so they may be quite long
    is_guide = models.BooleanField()

class Area(models.Model):
    area_id = models.IntegerField(primary_key=True)
    area_name = models.TextField(max_length=TITLE_MAX_LENGTH)
    area_quality = models.FloatField(null=True, blank=True)
    area_description = models.TextField(null=True, blank=True, max_length=DESCRIPTION_MAX_LENGTH)

class Feature(models.Model):
    feature_id = models.IntegerField(primary_key=True)
    feature_name = models.TextField(max_length=TITLE_MAX_LENGTH)
    feature_description = models.TextField(max_length=DESCRIPTION_MAX_LENGTH)
    gps = models.TextField(null=True, blank=True, max_length=50)
    location = models.TextField(null=True, blank=True, max_length=TITLE_MAX_LENGTH)
    area_id = models.ForeignKey(Area, on_delete=models.CASCADE)

class Face(models.Model):
    face_id = models.IntegerField(primary_key=True)
    face_name = models.TextField(max_length=NAME_MAX_LENGTH)
    face_description = models.TextField(null=True, blank=True, max_length=DESCRIPTION_MAX_LENGTH)
    feature_id = models.ForeignKey(Feature, on_delete=models.CASCADE)
    image = models.ImageField(null=True, blank=True) # PILLOW needs to be installed for this to work

class Climb(models.Model):
    climb_id = models.IntegerField(primary_key=True)
    author_email = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    climb_name = models.TextField(max_length=NAME_MAX_LENGTH) # max length is a concern for exploitation not formatting, so the number is fairly high
    climb_type = models.TextField(null=True, blank=True, max_length=50)
    face_id = models.ForeignKey(Face, null=True, blank=True, on_delete=models.CASCADE)
    grade = models.TextField(null=True, blank=True, max_length=20)
    quality = models.IntegerField(null=True, blank=True, validators=[validate_star_rating])
    quality_max = models.IntegerField(null=True, blank=True, validators=[validate_star_rating])
    height = models.FloatField(null=True, blank=True, validators=[validate_positive])
    description = models.TextField(null=True, blank=True, max_length=DESCRIPTION_MAX_LENGTH) # descriptions might be pretty long. We can determine more precise enforcement at the api layer

class Book(models.Model):
    book_id = models.IntegerField(primary_key=True)
    book_name = models.TextField(max_length=NAME_MAX_LENGTH)
    book_description = models.TextField(null=True, blank=True, max_length=DESCRIPTION_MAX_LENGTH)
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)

class BookArea(models.Model):
    area_id = models.ForeignKey(Area, on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('area_id', 'book_id'),)

class UserPrivateAccess(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    book_id = models.ForeignKey(Book, on_delete=models.DO_NOTHING)

    class Meta:
        unique_together = (('user_id', 'book_id'),)

class UserLibrary(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    book_id = models.ForeignKey(Book, on_delete=models.DO_NOTHING)

    class Meta:
        unique_together = (('user_id', 'book_id'),)

class BookReview(models.Model):
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)
    review_body = models.TextField(null=True, blank=True, max_length=DESCRIPTION_MAX_LENGTH)
    rating = models.IntegerField(validators=[validate_star_rating])

    class Meta:
        unique_together = (('reviewer', 'book_id'),)
