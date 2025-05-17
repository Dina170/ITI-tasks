
package com;

public class BorrowableBook extends Book implements Borrowable{
    private boolean isAvailable = true;
    public  BorrowableBook(String title) {
        super(title);
    }
    
    @Override
    public boolean isAvailable() {
        return isAvailable;
    }
    
    @Override
    public void borrowBook(User user) {
        if (isAvailable) {
            isAvailable = false;
            System.out.printf(user.getName() + " successfully borrowed " + getTitle());
        } else {
            System.out.println(getTitle() + " is not available.");
        }
    }
    
    @Override
    public void returnBook() {
        isAvailable = true;
        System.out.println("\n"+getTitle() + " has been returned.");
    }
}
