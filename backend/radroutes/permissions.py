from rest_framework import permissions
from .models import UserLibrary, Book


def grantBookReqUser(book, request):
    if request.method in permissions.SAFE_METHODS:
        """
        if book.listed == 1 and book.private == 0: #We need to think about adding ability to see info about listed private books
            return True
        else:
            q = UserLibrary.objects.get(book_id=book.book_id).filter(user_id=request.user)
            if q.exists():
                return True
            else:
                return False
        """
        return True
    else:
        if book.author == request.user:
            return True


class ClimbPermissions(permissions.BasePermission):
    def has_permission(self, request, view):  # PREVENT WRITE BY UNAUTH
        if request.method not in permissions.SAFE_METHODS:
            if request.user.is_authenticated:
                return True
            else:
                return False
        else:
            return True

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        book = Book.objects.get(book__area__feature__face__climb=obj.climb)

        return grantBookReqUser(book, request)


class FacePermissions(permissions.BasePermission):
    def has_permission(self, request, view):  # PREVENT WRITE BY UNAUTH
        if request.method not in permissions.SAFE_METHODS:
            if request.user.is_authenticated:
                return True
            else:
                return False
        else:
            return True

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True

        book = Book.objects.get(book__area__feature__face=obj.face_id)
        return grantBookReqUser(book, request)


class FeaturePermissions(permissions.BasePermission):
    def has_permission(self, request, view):  # PREVENT WRITE BY UNAUTH
        if request.method not in permissions.SAFE_METHODS:
            if request.user.is_authenticated:
                return True
            else:
                return False
        else:
            return True

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True

        book = Book.objects.get(book__area__feature=obj.feature_id)
        return grantBookReqUser(book, request)


class AreaPermissions(permissions.BasePermission):
    def has_permission(self, request, view):  # PREVENT WRITE BY UNAUTH
        if request.method not in permissions.SAFE_METHODS:
            if request.user.is_authenticated:
                return True
            else:
                return False
        else:
            return True

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True

        book = Book.objects.get(book__area=obj.area_id)
        return grantBookReqUser(book, request)


class BookPermissions(permissions.BasePermission):
    def has_permission(self, request, view):  # PREVENT WRITE BY UNAUTH
        if request.method not in permissions.SAFE_METHODS:
            if request.user.is_authenticated:
                return True
            else:
                return False
        else:
            return True

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True

        return grantBookReqUser(obj, request)
