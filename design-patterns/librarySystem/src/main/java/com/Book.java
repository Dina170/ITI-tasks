package com;

public class Book implements BookInterface{
    private String title;
//    private boolean isAvailable;

    public Book(String title) {
        this.title = title;
//        this.isAvailable = true;
    }

//    public void setAvailable(boolean available) {
//        isAvailable = available;
//    }

    public void setTitle(String title) {
        this.title = title;
    }

//    public boolean isAvailable() {
//        return isAvailable;
//    }
    
    @Override
    public String getTitle() {
        return title;
    }

//    public void borrowBook(User user) {
//        if (isAvailable) {
//            isAvailable = false;
//            System.out.printf(user.getName() + " successfully borrowed " + title);
//        } else {
//            System.out.println(title + " is not available.");
//        }
//    }
//
//    public void returnBook() {
//        isAvailable = true;
//        System.out.println("\n"+title + " has been returned.");
//    }


}
