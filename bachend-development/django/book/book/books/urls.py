from django.urls import path
from . import views

app_name = 'books'

urlpatterns = [
    path('', views.books, name='index'),
    path('<int:id>', views.book, name='book-display')
]
