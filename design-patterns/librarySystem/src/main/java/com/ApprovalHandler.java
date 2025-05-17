
package com;

public interface ApprovalHandler {
    void setNextHandler(ApprovalHandler next);
    void handleRequest(BookRequest request);
}
