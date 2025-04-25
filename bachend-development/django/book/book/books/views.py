from django.shortcuts import render
from .file_helpers import read_file

# Create your views here.
def books(request):
    context = {
        'books': read_file("books.json")
    }
    
    return render(request, 'books/index.html', context)