from django.urls import path
from . import views

urlpatterns = [
    path('', views.books, name='books.index'),
    path('<int:id>', views.book, name='books.book-display')
]
