
package com;

public class Librarian implements ApprovalHandler {
    private ApprovalHandler next;
    
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
        
        if (book instanceof Borrowable) {
            System.out.println("Librarian approved: " + book.getTitle());
            request.approve();
        }
        else if (next != null) {
            next.handleRequest(request);
        }
    }
}
