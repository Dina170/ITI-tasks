
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
                return new EBook(title, false);
            case PREMIUM_EBOOK: 
                EBook baseEbook = new EBook(title, false);
                return new PremiumEBookDecorator(baseEbook, 3);
            case PREMIUM: 
                return new PremiumBookDecorator(new BorrowableBook(title), 10);
            case SPECIAL_COLLECTION:
                return new SpecialCollectionBook(title, true);
            default:
                return new BorrowableBook(title);
        }
    }
}
