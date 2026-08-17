
package com.workerspot.entity;

public enum BookingCreditPlan {

    STARTER(
            "STARTER",
            1,
            20.0
    ),

    PLUS(
            "PLUS",
            3,
            40.0
    ),

    PRO(
            "PRO",
            5,
            80.0
    ),

    PREMIUM(
            "PREMIUM",
            8,
            100.0
    );

    private final String name;
    private final int credits;
    private final double amount;

    BookingCreditPlan(
            String name,
            int credits,
            double amount
    ) {
        this.name = name;
        this.credits = credits;
        this.amount = amount;
    }

    public String getName() {
        return name;
    }

    public int getCredits() {
        return credits;
    }

    public double getAmount() {
        return amount;
    }

    public static BookingCreditPlan fromName(String name) {

        for (BookingCreditPlan plan : values()) {

            if (plan.name.equalsIgnoreCase(name)) {
                return plan;
            }
        }

        throw new IllegalArgumentException(
                "Invalid booking credit plan."
        );
    }
}