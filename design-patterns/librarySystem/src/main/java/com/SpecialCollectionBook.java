
package com;

public class SpecialCollectionBook extends BorrowableBook{
    private final boolean requiresManagerApproval;
    
    public SpecialCollectionBook(String title, boolean requiresManagerApproval) {
        super(title);
        this.requiresManagerApproval = requiresManagerApproval;
    }
    
    public boolean requiresManagerApproval() {
        return requiresManagerApproval;
    }
    
    @Override
    public void borrowBook(User user) {
        System.out.println("Special collection handling for: " + getTitle());
        super.borrowBook(user);
    }
}
