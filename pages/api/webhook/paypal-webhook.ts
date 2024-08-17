import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { event_type } = req.body;
    console.log('PayPal Webhook Event:', event_type);
    // Traitez l'événement PayPal ici
    res.status(200).end();
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
