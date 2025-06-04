import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, Session } from 'next-auth'; // Import Session
import { authOptions } from '../auth/[...nextauth]';
import prismadb from '@/lib/prismadb';
// Remove: import { CustomSession } from '@/lib/types'; // If this was a generic one, we'll define locally or ensure it matches

// Define an interface for the session user that includes id and role
interface SessionUser {
  id?: string; // Or string if always present
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}

// Define an interface for the session that includes the custom user
interface CustomAuthSession extends Session {
  user?: SessionUser;
}

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
    const session = await getServerSession(req, res, authOptions) as CustomAuthSession | null;

    if (!session?.user?.email) { // Basic authentication check
      return res.status(401).json({ error: 'Unauthorized - Not logged in' });
    }

    // Role-based authorization
    if (session.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden - Only admins can upload articles' });
    }

    const userId = session.user.id;
    if (!userId) {
        // This case should ideally not be reached if session.user.email is present
        // and NextAuth is configured to include ID.
        return res.status(401).json({ error: 'Unauthorized - User ID missing in session' });
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
        imageOne: thumbnailUrl, // Assuming imageOne is the correct field for thumbnailUrl
        userId: userId, // Use userId from session
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
    return res.status(500).json({ error: 'Failed to create article due to an internal error' });
  }
}