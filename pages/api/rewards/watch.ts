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

    if (!session?.user?.email || !session?.user?.isPremium) {
      return res.status(403).json({ error: 'Premium subscription required' });
    }

    const { movieId, watchedRatio, rewardAmount } = req.body;

    // Create watch reward
    await prismadb.reward.create({
      data: {
        type: 'tabz',
        amount: rewardAmount,
        userId: session.user.id,
        claimed: false,
        source: 'watch',
        movieId
      }
    });

    // Update user's watch count
    await prismadb.user.update({
      where: { email: session.user.email },
      data: {
        watchCount: { increment: 1 }
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Watch reward error:', error);
    return res.status(500).json({ error: 'Failed to process watch reward' });
  }
}