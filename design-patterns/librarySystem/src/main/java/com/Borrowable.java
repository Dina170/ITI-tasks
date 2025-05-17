
package com;

public interface Borrowable {    
     void borrowBook(User user);
     void returnBook();
     boolean isAvailable();
}
