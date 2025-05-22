import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { authOptions } from '../auth/[...nextauth]';
import { VIDEO_DURATIONS, VIDEO_LIMITS } from '@/lib/constants';

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

    const user = await prismadb.user.findUnique({
      where: { email: session.user.email },
      include: { videos: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const videoCount = user.videos.length;
    const maxVideos = user.isPremium ? VIDEO_LIMITS.PREMIUM_TOTAL : VIDEO_LIMITS.REGULAR;

    if (videoCount >= maxVideos) {
      return res.status(400).json({ error: 'Video upload limit reached' });
    }

    const { title, description, videoUrl, duration, isPermanent } = req.body;

    // Calculate expiration date
    const expiresAt = new Date(
      Date.now() + (
        user.isPremium && isPermanent
          ? VIDEO_DURATIONS.PREMIUM
          : VIDEO_DURATIONS.REGULAR
      )
    );

    const video = await prismadb.video.create({
      data: {
        title,
        description,
        videoUrl,
        duration,
        userId: user.id,
        expiresAt,
        isPermanent: user.isPremium && isPermanent
      }
    });

    return res.status(201).json(video);
  } catch (error) {
    console.error('Video upload error:', error);
    return res.status(500).json({ error: 'Failed to upload video' });
  }
}