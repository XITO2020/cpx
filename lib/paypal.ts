import { PayPalHttpClient, Environment } from '@paypal/checkout-server-sdk';

if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
  throw new Error('PayPal credentials are not defined');
}

let environment = new Environment.Sandbox(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);

if (process.env.NODE_ENV === 'production') {
  environment = new Environment.Live(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
}

const paypalClient = new PayPalHttpClient(environment);

export default paypalClient;