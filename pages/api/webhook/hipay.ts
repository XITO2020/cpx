import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, plan } = req.body;

    try {
      const response = await axios.post('https://api.hipay.com/rest/v1/payments', {
        // Données spécifiques à HiPay
        amount: plan === 'Basic' ? 10 : plan === 'Standard' ? 20 : 30, // Exemple de prix
        currency: 'USD',
        description: `${plan} Plan Subscription`,
        customer: {
          firstname: name,
          email,
        },
        // Autres paramètres requis par HiPay
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HIPAY_API_KEY}`,
        },
      });

      if (response.status === 200) {
        res.status(200).json(response.data);
      } else {
        res.status(500).json({ error: 'Payment processing failed' });
      }
    } catch (error) {
      console.error('HiPay Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
