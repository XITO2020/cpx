import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import prismadb from '@/lib/prismadb';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface HipayEvent {
  event_type: string;
  data: {
    transaction: {
      reference: string;
      state: string;
      amount: number;
      currency: string;
      customer: {
        email: string;
      };
    };
  };
}

async function updateSubscription(
  email: string,
  amount: number,
  status: 'active' | 'cancelled' | 'failed'
) {
  const planType = amount === 10 ? 'basic' : amount === 20 ? 'standard' : 'premium';

  await prismadb.user.update({
    where: { email },
    data: {
      isPremium: status === 'active',
      subscriptionPlan: status === 'active' ? planType : null,
      subscriptionStatus: status,
      subscriptionEndDate: status === 'active' 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        : null
    }
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const rawBody = await buffer(req);
    const signature = req.headers['hipay-signature'];

    if (!signature || !process.env.HIPAY_WEBHOOK_SECRET) {
      return res.status(400).json({ error: 'Missing signature' });
    }

    // Verify webhook signature
    const isValid = verifySignature(rawBody, signature as string);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const event = JSON.parse(rawBody.toString()) as HipayEvent;
    const { transaction } = event.data;

    switch (event.event_type) {
      case 'payment.captured':
        await updateSubscription(
          transaction.customer.email,
          transaction.amount,
          'active'
        );
        break;

      case 'payment.failed':
        await updateSubscription(
          transaction.customer.email,
          transaction.amount,
          'failed'
        );
        break;

      case 'subscription.cancelled':
        await updateSubscription(
          transaction.customer.email,
          transaction.amount,
          'cancelled'
        );
        break;
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}

function verifySignature(payload: Buffer, signature: string): boolean {
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', process.env.HIPAY_WEBHOOK_SECRET!);
  const expectedSignature = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}