from django.urls import path
from . import views

urlpatterns = [
    path("", views.books, name='books-home'),
    path("<int:id>", views.book, name='book-display')
]
