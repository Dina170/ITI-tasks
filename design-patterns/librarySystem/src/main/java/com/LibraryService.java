package com;

import java.util.ArrayList;
import java.util.List;

public class LibraryService {

    private List<BookInterface> books = new ArrayList<>();
    private BookFactory bookFactory;
    private final ApprovalHandler approvalChain;

    LibraryService(BookFactory bookFactory){
        this.bookFactory = bookFactory;
        Librarian librarian = new Librarian();
        Manger manger = new Manger();
        librarian.setNextHandler(manger);
        
        this.approvalChain = librarian;
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

    public void borrowBook(String title, User user) {
        BookInterface book = findBook(title);
        if (book == null) {
            System.out.println(title + " not found");
            return;
        }

        if (book instanceof PremiumBookDecorator) {
            handlePremiumBorrow((PremiumBookDecorator)book, user);
            return;
        }

        BookRequest request = new BookRequest(book, user);
        approvalChain.handleRequest(request);
        
        if (request.isApproved() && book instanceof Borrowable) {
            ((Borrowable)book).borrowBook(user);
        }
    }

    private void handlePremiumBorrow(PremiumBookDecorator book, User user) {
        if (!user.isPremium()) {
            System.out.println("Premium book requires premium membership");
            return;
        }
        
        System.out.println("Premium access granted for: " + book.getTitle());
        book.borrowBook(user);
    }

    public void returnBook(String title) {
        BookInterface book = findBook(title);
        if (book instanceof Borrowable && book != null) {
            ((Borrowable) book).returnBook();
        } else {
            System.out.println(title+" is not found in the library.");
        }
    }
    
    public void accessEBook(String title, User user) {
    BookInterface book = findBook(title);
    if (book instanceof EBook) {
        ((EBook)book).access(user);
    } else {
        System.out.println(title + " is not an eBook");
    }
}
}
