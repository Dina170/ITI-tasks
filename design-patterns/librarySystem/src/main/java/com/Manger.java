
package com;


public class Manger implements ApprovalHandler {
    private static final int MAX_DAYS = 14;
    private ApprovalHandler next;
    
    @Override
    public void setNextHandler(ApprovalHandler next) {
        this.next = next;
    }

    @Override
    public void handleRequest(BookRequest request) {
        if (request.getDaysRequested() <= MAX_DAYS) {
            System.out.printf("Manager approved %s for %d days\n", 
                request.getBook().getTitle(), request.getDaysRequested());
            request.approve();
        } else if (next != null) {
            next.handleRequest(request);
        } else {
            System.out.println("Request cannot be approved");
        }
    }
}

