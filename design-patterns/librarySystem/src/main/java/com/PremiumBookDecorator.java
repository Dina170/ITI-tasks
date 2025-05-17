package com;


public class PremiumBookDecorator extends BorrowableBook {
    private final BorrowableBook decoratedBook;
    private final int extraDays;

    public PremiumBookDecorator(BorrowableBook book, int extraDays) {
        super(book.getTitle());
        this.decoratedBook = book;
        this.extraDays = extraDays;
    }

    @Override
    public void borrowBook(User user) {
        decoratedBook.borrowBook(user);
        if (user.isPremium()) {
            System.out.printf(" [Premium: +%d extra days]", extraDays);
        }
    }

    @Override
    public void returnBook() {
        decoratedBook.returnBook();
    }

    @Override
    public boolean isAvailable() {
        return decoratedBook.isAvailable();
    }
}