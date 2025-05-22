import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import prismadb from '@/lib/prismadb';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handleStripeWebhook(
  event: Stripe.Event,
  stripe: Stripe
) {
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await updateSubscription(
        paymentIntent.metadata.userId,
        paymentIntent.metadata.plan,
        'stripe'
      );
      break;

    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      await cancelSubscription(subscription.metadata.userId);
      break;
  }
}

async function handleHipayWebhook(
  event: any
) {
  switch (event.event_type) {
    case 'payment.captured':
      await updateSubscription(
        event.data.custom_data.userId,
        event.data.custom_data.plan,
        'hipay'
      );
      break;

    case 'subscription.cancelled':
      await cancelSubscription(event.data.custom_data.userId);
      break;
  }
}

async function handlePayPalWebhook(
  event: any
) {
  switch (event.event_type) {
    case 'PAYMENT.CAPTURE.COMPLETED':
      await updateSubscription(
        event.resource.custom_id,
        event.resource.description.split(' ')[0].toLowerCase(),
        'paypal'
      );
      break;

    case 'BILLING.SUBSCRIPTION.CANCELLED':
      await cancelSubscription(event.resource.custom_id);
      break;
  }
}

async function updateSubscription(
  userId: string,
  plan: string,
  provider: 'stripe' | 'hipay' | 'paypal'
) {
  await prismadb.user.update({
    where: { id: userId },
    data: {
      isPremium: true,
      subscriptionPlan: plan,
      subscriptionStatus: 'active',
      subscriptionProvider: provider,
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  });
}

async function cancelSubscription(userId: string) {
  await prismadb.user.update({
    where: { id: userId },
    data: {
      isPremium: false,
      subscriptionPlan: null,
      subscriptionStatus: 'cancelled',
      subscriptionEndDate: null
    }
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const signature = req.headers['stripe-signature'] ||
                   req.headers['hipay-signature'] ||
                   req.headers['paypal-auth-algo'];

  try {
    const rawBody = await buffer(req);

    if (req.headers['stripe-signature']) {
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature as string,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      await handleStripeWebhook(event, stripe);
    } else if (req.headers['hipay-signature']) {
      const event = JSON.parse(rawBody.toString());
      // Verify HiPay signature
      if (verifyHipaySignature(rawBody, signature as string)) {
        await handleHipayWebhook(event);
      }
    } else if (req.headers['paypal-auth-algo']) {
      const event = JSON.parse(rawBody.toString());
      // Verify PayPal signature
      if (verifyPayPalSignature(rawBody, signature as string)) {
        await handlePayPalWebhook(event);
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(400).json({
      error: `Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
  }
}