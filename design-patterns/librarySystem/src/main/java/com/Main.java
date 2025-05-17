package com;

public class Main {
    public static void main(String[] args) {
        BookFactory factory = new BookFactoryImpl();
        LibraryService library = new LibraryService(factory);
        Book book = new Book("Harry Potter");
        Book physicalBook = new PhysicalBook("Lord of the Rings");
        Book historicalBook = new HistoricalBook("Outlander");
        Book ebook = new EBook("Outlander", false);
        
        library.addBook("special", BookType.SPECIAL_COLLECTION);
        library.addBook("Design Patterns", BookType.PREMIUM_EBOOK);

        library.addBook("Harry Potter", BookType.REGULAR);
        library.addBook("Lord of the Rings", BookType.PHYSICAL);
        library.addBook("Clean Code", BookType.EBOOK);

        // Create users
        User john = new User("John", false);
        User Alice = new User("Alice", true);

        library.borrowBook("Harry Potter", john, 5 );
        System.out.printf("\n"+"=============================");
        library.returnBook("Harry Potter");
        System.out.println("=============================");
        library.borrowBook("Lord of the Rings",  john, 10);
        System.out.println("=============================");
       // library.returnBook("Lord of the Rings")
        library.borrowBook("math", john, 20 );
        library.returnBook("math");
        System.out.println("=============================");
        library.borrowBook("Lord of the Rings", Alice, 5);
        System.out.println("=============================");
        library.borrowBook("Outlander", Alice, 10);
        System.out.println("=============================");
        library.addBook("Outlander", BookType.EBOOK);
        library.borrowBook("Outlander", Alice, 20);

         library.addBook("Premium Book", BookType.PREMIUM);
    
        User premiumUser = new User("test", true);
        User regularUser = new User("test2", false);

        library.borrowBook("Premium Book", premiumUser, 5); 

        library.borrowBook("Premium Book", regularUser, 10);
        
        library.accessEBook("Design Patterns", premiumUser);
        library.accessEBook("Design Patterns", regularUser);
        
        
        library.borrowBook("special", regularUser, 5);
        
        String json = "{\"bookTitle\":\"Design Patterns\",\"isBorrowable\":true,\"authorName\":\"Erich Gamma\",\"year\":1994}";
    
    
        BookInterface book2 = ExternalBookAdapter.convertToBook(json);
        System.out.println("Converted: " + book2);
        
//        if (book2 instanceof Borrowable) {
//            ((Borrowable)book).borrowBook(new User("Alice"));
//        }
    
        
    }
}
