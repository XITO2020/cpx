import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { authOptions } from '../../auth/[...nextauth]';

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

    const { rewardId } = req.query;

    const reward = await prismadb.reward.findUnique({
      where: { id: rewardId as string },
      include: { user: true }
    });

    if (!reward) {
      return res.status(404).json({ error: 'Reward not found' });
    }

    if (reward.claimed) {
      return res.status(400).json({ error: 'Reward already claimed' });
    }

    if (reward.user.email !== session.user.email) {
      return res.status(403).json({ error: 'Not authorized to claim this reward' });
    }

    // Process reward based on type
    switch (reward.type) {
      case 'tabz':
        await prismadb.user.update({
          where: { email: session.user.email },
          data: {
            tabzBalance: { increment: reward.amount }
          }
        });
        break;

      case 'upload_slot':
        // Increase upload limit logic
        break;

      case 'duration_increase':
        // Increase duration limit logic
        break;
    }

    // Mark reward as claimed
    await prismadb.reward.update({
      where: { id: rewardId as string },
      data: { claimed: true }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Reward claim error:', error);
    return res.status(500).json({ error: 'Failed to claim reward' });
  }
}