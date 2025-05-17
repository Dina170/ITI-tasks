
package com;


public class Director implements ApprovalHandler {
    @Override
    public void setNextHandler(ApprovalHandler next) {
        // Director is final in chain
    }

    @Override
    public void handleRequest(BookRequest request) {
        System.out.printf("Director approved %s for %d days\n", 
            request.getBook().getTitle(), request.getDaysRequested());
        request.approve();
    }
}