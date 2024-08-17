export const constants = {
    //Useful to reference Conspix.tv
    url: 
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://www.conspix.tv", 
    db: "conspix",
    paymentLinks: {
        OneYearMembership:
            process.env.NODE_ENV === "development"
            ? "https://buy.stripe.com/test_eVa3fHgj20BT3p6dQQ"
            : "",
     
    },
}