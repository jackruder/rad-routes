from django.contrib import admin

from .models import (
    User,
    Area,
    Face,
    Book,
    Climb,
    BookReview,
    UserLibrary,
    UserPrivateAccess,
    Feature
)

# Register your models here.

admin.site.register(User)
admin.site.register(Area)
admin.site.register(Face)
admin.site.register(Book)
admin.site.register(Climb)
admin.site.register(BookReview)
admin.site.register(UserLibrary)
admin.site.register(UserPrivateAccess)
admin.site.register(Feature)
