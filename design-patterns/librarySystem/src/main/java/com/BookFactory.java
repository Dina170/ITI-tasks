
package com;

public interface BookFactory {
    BookInterface createBook(String title, BookType type);
}
