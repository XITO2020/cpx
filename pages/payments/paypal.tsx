import { useEffect } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = () => {
    useEffect(() => {
        // Configure PayPal SDK
        // Make sure to include PayPal SDK script in _document.js or index.html
    }, []);

    return (
        <div>
            <h1>Pay with PayPal</h1>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '0.01' // Replace with actual amount
                            }
                        }]
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(details => {
                        alert('Transaction completed by ' + details.payer.name.given_name);
                        // Redirect or notify the server about the successful payment
                    });
                }}
            />
        </div>
    );
};

export default PayPalPayment;
