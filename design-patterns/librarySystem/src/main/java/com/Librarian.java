
package com;

public class Librarian implements ApprovalHandler {
    private ApprovalHandler next;
    private static final int MAX_DAYS = 7;
    
    @Override
    public void setNextHandler(ApprovalHandler next) {
        this.next = next;
    }

    @Override
    public void handleRequest(BookRequest request) {
        BookInterface book = request.getBook();
        
        if (book instanceof SpecialCollectionBook) {
            SpecialCollectionBook scb = (SpecialCollectionBook) book;
            if (scb.requiresManagerApproval()) {
                System.out.println("Special collection book requires manager approval");
                if (next != null) next.handleRequest(request);
                return;
            }
        } 
        
        if (request.getDaysRequested() <= MAX_DAYS && book instanceof Borrowable) {
            System.out.printf("Librarian approved %s for %d days\n", 
                book.getTitle(), request.getDaysRequested());
            request.approve();
        }
        else if (next != null) {
            next.handleRequest(request);
        } else {
            System.out.println("Request cannot be approved");
        }
    }
}
