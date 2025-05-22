import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prismadb from '@/lib/prismadb';
import { CustomSession } from '@/lib/types';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb' // Increased limit for images
    },
  },
};

interface ArticleRequest {
  title: string;
  description: string;
  movieId?: string;
  thumbnailUrl: string;
  content: string;
  tags?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prismadb.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, admin: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const {
      title,
      description,
      movieId,
      thumbnailUrl,
      content,
      tags
    } = req.body as ArticleRequest;

    if (!title || !description || !thumbnailUrl || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const article = await prismadb.linkedArticle.create({
      data: {
        title,
        description,
        content,
        imageOne: thumbnailUrl,
        userId: user.id,
        ...(movieId && { movieId }),
        ...(tags && {
          tags: {
            create: tags.map(tag => ({
              name: tag
            }))
          }
        })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        tags: true
      }
    });

    return res.status(201).json(article);
  } catch (error) {
    console.error('[Article Upload Error]:', error);
    return res.status(500).json({ error: 'Failed to create article' });
  }
}