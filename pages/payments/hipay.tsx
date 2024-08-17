import React, { useEffect } from 'react';

const HiPayPayment = () => {
    useEffect(() => {
        // Configure HiPay SDK or API call
        // Implement HiPay payment initialization here
    }, []);

    const handlePayment = async () => {
        // Call HiPay API to create a payment request
        // Redirect the user to HiPay payment page
    };

    return (
        <div>
            <h1>Pay with HiPay</h1>
            <button onClick={handlePayment}>Pay with HiPay</button>
        </div>
    );
};

export default HiPayPayment;
