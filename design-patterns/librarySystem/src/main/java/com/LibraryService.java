package com;

import java.util.ArrayList;
import java.util.List;

public class LibraryService {

    private List<BookInterface> books = new ArrayList<>();
    private BookFactory bookFactory;

    LibraryService(BookFactory bookFactory){
        this.bookFactory = bookFactory;
    }

    public void addBook(String title, BookType type) {
        BookInterface book = bookFactory.createBook(title, type);
        books.add(book);
    }

    public BookInterface findBook(String title) {
        for (BookInterface book : books) {
            if (book.getTitle().equalsIgnoreCase(title)) {
                return book;
            }
        }
        return null;
    }

    public void borrowBook(String title,User user) {
        BookInterface book = findBook(title);
        if(book==null){
            System.out.println(title+" is not found in the library.");
        } else if (book instanceof Borrowable && !((Borrowable) book).isAvailable()) {
            System.out.println(title+" is not available.");
        }else if (book instanceof Borrowable){
            ((Borrowable) book).borrowBook(user);
        }

    }

    public void returnBook(String title) {
        BookInterface book = findBook(title);
        if (book instanceof Borrowable && book != null) {
            ((Borrowable) book).returnBook();
        } else {
            System.out.println(title+" is not found in the library.");
        }
    }
}
