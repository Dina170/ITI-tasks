from django.shortcuts import render
from .file_helpers import read_file
from .models import Book, Author

books_list = read_file("books.json")

# Create your views here.
def books(request):
    context = {
        'books': Book.objects.all()
    }
    
    return render(request, 'books/index.html', context)

def book(request, id):
    context = {
        'book': Book.objects.get(pk=id)
    }
    return render(request, 'books/book.html', context)


def author(request, id):
    author = Author.objects.get(pk=id)
    context = {
        'author': author,
        'books': author.book_set.all()
    }
    return render(request, 'books/author.html', context)
    