
package com;


public class BookRequest {
    private final BookInterface book;
    private final User user;
    private final int daysRequested;
    private boolean approved = false;
    
    public BookRequest(BookInterface book, User user,  int daysRequested) {
        this.book = book;
        this.user = user;
        this.daysRequested = daysRequested;
    }
    
    public void approve() {
        this.approved = true;
    }
    
    public BookInterface getBook() { return book; }
    public User getUser() { return user; }
    public boolean isApproved() { return approved; }    
    public int getDaysRequested() { return daysRequested; }
}
