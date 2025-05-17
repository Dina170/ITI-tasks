
package com;


public class BookRequest {
    private final BookInterface book;
    private final User user;
    private boolean approved = false;
    
    public BookRequest(BookInterface book, User user) {
        this.book = book;
        this.user = user;
    }
    
    public void approve() {
        this.approved = true;
    }
    
    public BookInterface getBook() { return book; }
    public User getUser() { return user; }
    public boolean isApproved() { return approved; }
}
