import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import prismadb from '@/lib/prismadb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function updateUserSubscription(
  stripeCustomerId: string,
  status: 'active' | 'cancelled' | 'failed',
  priceId?: string
) {
  const user = await prismadb.user.findFirst({
    where: { stripeCustomerId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const planType = priceId === process.env.STRIPE_BASIC_PRICE_ID
    ? 'basic'
    : priceId === process.env.STRIPE_STANDARD_PRICE_ID
      ? 'standard'
      : 'premium';

  await prismadb.user.update({
    where: { id: user.id },
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
    const signature = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Webhook signature verification failed');
      return res.status(400).send('Webhook signature verification failed');
    }

    const { type, data } = event;

    switch (type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = data.object as Stripe.Subscription;
        await updateUserSubscription(
          subscription.customer as string,
          subscription.status === 'active' ? 'active' : 'failed',
          subscription.items.data[0].price.id
        );
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = data.object as Stripe.Subscription;
        await updateUserSubscription(
          subscription.customer as string,
          'cancelled'
        );
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = data.object as Stripe.PaymentIntent;
        // Handle successful payment
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = data.object as Stripe.PaymentIntent;
        // Handle failed payment
        break;
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}