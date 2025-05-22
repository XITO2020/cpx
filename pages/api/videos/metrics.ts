import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { authOptions } from '../auth/[...nextauth]';

const REWARD_THRESHOLDS = {
  likes: 1000,
  views: 10000,
  shares: 500
};

const TABZ_REWARDS = {
  small: 100,
  medium: 500,
  large: 1000
};

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

    const { movieId } = req.body;

    const movie = await prismadb.movie.findUnique({
      where: { id: movieId },
      include: { metrics: true }
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Check if metrics meet reward threshold
    const meetsThreshold = 
      movie.metrics.likes >= REWARD_THRESHOLDS.likes &&
      movie.metrics.views >= REWARD_THRESHOLDS.views &&
      movie.metrics.shares >= REWARD_THRESHOLDS.shares;

    if (meetsThreshold && !movie.metrics.rewardThreshold) {
      // Create reward
      await prismadb.reward.create({
        data: {
          type: 'tabz',
          amount: TABZ_REWARDS.medium,
          userId: movie.creatorId,
          claimed: false
        }
      });

      // Update movie metrics
      await prismadb.movieMetrics.update({
        where: { movieId },
        data: { rewardThreshold: true }
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Metrics processing error:', error);
    return res.status(500).json({ error: 'Failed to process metrics' });
  }
}