from django.shortcuts import render
from .file_helpers import read_file

books_list = read_file("books.json")

# Create your views here.
def books(request):
    context = {
        'books': books_list
    }
    
    return render(request, 'books/index.html', context)

def book(request, id):
    context = {}
    for book in books_list:
        if book['id'] == id:
            context['book'] = book
            return render(request, 'books/book.html', context)