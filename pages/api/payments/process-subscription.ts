import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import prismadb from '@/lib/prismadb';
import { sendBillingEmail } from '@/lib/email';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { plan, amount, currency, paymentMethod } = req.body;

    // Create order record
    const order = await prismadb.order.create({
      data: {
        orderId: uuidv4(),
        userId: session.user.id,
        plan,
        amount,
        currency,
        paymentMethod,
        status: 'completed',
      }
    });

    // Update user subscription
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // 30-day subscription

    await prismadb.user.update({
      where: { email: session.user.email },
      data: {
        isPremium: true,
        subscriptionPlan: plan,
        subscriptionStatus: 'active',
        subscriptionStartDate: startDate,
        subscriptionEndDate: endDate,
      }
    });

    // Send billing email
    await sendBillingEmail({
      email: session.user.email,
      name: session.user.name || 'Valued Customer',
      plan,
      amount,
      currency,
      orderId: order.orderId,
      startDate,
      endDate,
      paymentMethod,
    });

    return res.status(200).json({
      success: true,
      order: {
        orderId: order.orderId,
        startDate,
        endDate,
      }
    });
  } catch (error) {
    console.error('Subscription processing error:', error);
    return res.status(500).json({ error: 'Failed to process subscription' });
  }
}