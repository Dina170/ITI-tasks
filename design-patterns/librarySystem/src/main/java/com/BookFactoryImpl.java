
package com;

public class BookFactoryImpl implements BookFactory {
    @Override
    public BookInterface createBook(String title, BookType type) {
        switch (type) {
            case PHYSICAL:
                return new PhysicalBook(title);
            case HISTORICAL:
                return new HistoricalBook(title);
            case EBOOK:
                return new EBook(title);
            case PREMIUM: 
                return new PremiumBookDecorator(new BorrowableBook(title), 10);
            default:
                return new BorrowableBook(title);
        }
    }
}
