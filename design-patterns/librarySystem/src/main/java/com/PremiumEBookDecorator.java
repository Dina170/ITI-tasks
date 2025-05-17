
package com;

public class PremiumEBookDecorator extends EBook {
    private final EBook eBook;
    private final int extraPremiumFeatures;
    
    public PremiumEBookDecorator(EBook eBook, int extraFeatures) {
        super(eBook.getTitle(), true); // Force premium access
        this.eBook = eBook;
        this.extraPremiumFeatures = extraFeatures;
    }
    
    @Override
    public void access(User user) {
        if (user.isPremium()) {
            super.access(user);
            System.out.println(" [Premium features unlocked: " + extraPremiumFeatures + "]");
        } else {
            System.out.println(getTitle() + " requires premium subscription");
        }
    }
}