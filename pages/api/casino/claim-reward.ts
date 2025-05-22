import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
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

    const { reward } = req.body;

    // Check if user has won in the last month
    const lastWin = await prismadb.reward.findFirst({
      where: {
        userId: session.user.id,
        type: 'jackpot',
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    });

    if (lastWin) {
      return res.status(400).json({ error: 'Can only win once per month' });
    }

    // Create reward and update user's tabz balance
    await prismadb.$transaction([
      prismadb.reward.create({
        data: {
          type: 'jackpot',
          amount: reward,
          userId: session.user.id,
          claimed: true
        }
      }),
      prismadb.user.update({
        where: { id: session.user.id },
        data: {
          tabzBalance: {
            increment: reward
          }
        }
      })
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Jackpot reward claim error:', error);
    return res.status(500).json({ error: 'Failed to claim reward' });
  }
}