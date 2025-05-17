package com;

public class EBook extends Book {
    private boolean premiumOnly;
    
    public EBook(String title, boolean premiumOnly) {
        super(title);
        this.premiumOnly = premiumOnly;
    }
    
    public boolean isPremiumOnly() {
        return premiumOnly;
    }
    
    public void access(User user) {
        if (premiumOnly && !user.isPremium()) {
            System.out.println(this.getTitle() + " requires premium access");
        } else {
            System.out.println(user.getName() + " is reading eBook: " + this.getTitle());
        }
    }
}
