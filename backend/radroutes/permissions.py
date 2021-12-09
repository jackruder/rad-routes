from rest_framework import permissions
from .models import UserLibrary, Book


def grantBookReqUser(book, request):
    if request.user.is_superuser:
        return True
    if request.method in permissions.SAFE_METHODS:
        return True
    else:
        if book.author == request.user:
            return True
        else:
            return False


class GuideBookPermissions(permissions.BasePermission):
    def has_permission(self, request, view):  # PREVENT WRITE BY UNAUTH
        if request.method not in permissions.SAFE_METHODS:
            if request.user.is_authenticated:
                return True
            else:
                return False
        else:
            return True


class ClimbPermissions(GuideBookPermissions):
    def has_object_permission(self, request, view, obj):
        book = Book.objects.get(book_id=obj.face.feature.area.book.book_id)

        return grantBookReqUser(book, request)


class FacePermissions(GuideBookPermissions):
    def has_object_permission(self, request, view, obj):
        book = Book.objects.get(book_id=obj.feature.area.book.book_id)
        return grantBookReqUser(book, request)


class FeaturePermissions(GuideBookPermissions):
    def has_object_permission(self, request, view, obj):
        book = Book.objects.get(book_id=obj.area.book.book_id)
        return grantBookReqUser(book, request)


class AreaPermissions(GuideBookPermissions):
    def has_object_permission(self, request, view, obj):
        book = Book.objects.get(book_id=obj.book.book_id)
        return grantBookReqUser(book, request)


class BookPermissions(GuideBookPermissions):
    def has_object_permission(self, request, view, obj):
        return grantBookReqUser(obj, request)


class UserCreateListPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            if request.user.is_superuser:
                return True
            else:
                return False
        else:
            if request.method == "POST":
                return True
            else:
                return False
