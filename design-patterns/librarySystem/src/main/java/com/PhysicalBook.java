package com;

public class PhysicalBook extends BorrowableBook{

    public PhysicalBook(String title) {
        super(title);
    }

    @Override
    public void borrowBook(User user) {
        super.borrowBook(user);
        System.out.println(" physical book");
    }
}
