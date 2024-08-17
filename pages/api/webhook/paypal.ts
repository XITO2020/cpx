import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, plan } = req.body;
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
    
    try {
      const tokenResponse = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', 'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const { access_token } = tokenResponse.data;

      const paymentResponse = await axios.post('https://api-m.sandbox.paypal.com/v1/payments/payment', {
        intent: 'sale',
        payer: { payment_method: 'paypal' },
        transactions: [{ amount: { total: plan === 'Basic' ? '10.00' : plan === 'Standard' ? '20.00' : '30.00', currency: 'USD' }, description: `${plan} Plan Subscription` }],
        redirect_urls: {
          return_url: 'https://your-site.com/success',
          cancel_url: 'https://your-site.com/cancel',
        },
      }, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (paymentResponse.status === 200) {
        res.status(200).json(paymentResponse.data);
      } else {
        res.status(500).json({ error: 'Payment processing failed' });
      }
    } catch (error) {
      console.error('PayPal Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
