
package com;


public class Manger implements ApprovalHandler {
    @Override
    public void setNextHandler(ApprovalHandler next) {
        // Manager is end of chain
    }

    @Override
    public void handleRequest(BookRequest request) {
        System.out.println("Manager approved borrowing: " + request.getBook().getTitle());
        request.approve();
    }
}

