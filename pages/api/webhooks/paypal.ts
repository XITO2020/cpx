import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import prismadb from '@/lib/prismadb';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface PayPalEvent {
  event_type: string;
  resource: {
    id: string;
    status: string;
    payer: {
      email_address: string;
    };
    purchase_units: Array<{
      amount: {
        value: string;
        currency_code: string;
      };
      custom_id?: string;
    }>;
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
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
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
    const signature = req.headers['paypal-auth-algo'];

    if (!signature || !process.env.PAYPAL_WEBHOOK_SECRET) {
      return res.status(400).json({ error: 'Missing signature' });
    }

    // Verify webhook signature
    const isValid = verifyPayPalSignature(rawBody, signature as string);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const event = JSON.parse(rawBody.toString()) as PayPalEvent;
    const { resource } = event;

    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await updateSubscription(
          resource.payer.email_address,
          parseFloat(resource.purchase_units[0].amount.value),
          'active'
        );
        break;

      case 'PAYMENT.CAPTURE.DENIED':
        await updateSubscription(
          resource.payer.email_address,
          parseFloat(resource.purchase_units[0].amount.value),
          'failed'
        );
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        await updateSubscription(
          resource.payer.email_address,
          parseFloat(resource.purchase_units[0].amount.value),
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

function verifyPayPalSignature(payload: Buffer, signature: string): boolean {
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', process.env.PAYPAL_WEBHOOK_SECRET!);
  const expectedSignature = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}