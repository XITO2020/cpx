import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, Session } from 'next-auth'; // Import Session type
import prismadb from '@/lib/prismadb';
import { authOptions } from '../auth/[...nextauth]';

// Define an interface for the session user that includes the role
interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null; // Add role here
}

// Define an interface for the session that includes the custom user
interface CustomAuthSession extends Session {
  user?: SessionUser;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb'
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const session = await getServerSession(req, res, authOptions) as CustomAuthSession | null; // Cast to custom session type

    // Check if user is authenticated
    if (!session?.user?.email) { // Still good to check for email or a core identifier
      return res.status(401).json({ error: 'Unauthorized - Not logged in' });
    }

    // Check if user has the 'ADMIN' role
    if (session.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden - Only admins can upload movies' });
    }

    // Ensure user ID is available for linking movie to user
    const userId = session.user.id;
    if (!userId) {
      // This case should ideally not happen if session handling is correct
      // and user always has an ID.
      return res.status(401).json({ error: 'Unauthorized - User ID not found in session' });
    }

    const { 
      title,
      description,
      videoUrl,
      thumbnailUrl,
      genres,
      duration,
      releaseDate 
    } = req.body;

    if (!title || !description || !videoUrl || !thumbnailUrl || !genres) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const movie = await prismadb.movie.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        duration: duration || null,
        releaseDate: releaseDate ? new Date(releaseDate) : null,
        userId: userId, // Link movie to the uploading user
        movieGenres: {
          create: genres.map((genreId: string) => ({
            genre: {
              connect: { id: genreId }
            }
          }))
        }
      },
      include: {
        movieGenres: {
          include: {
            genre: true
          }
        }
      }
    });

    return res.status(201).json(movie);
  } catch (error) {
    console.error('[Movie Upload Error]:', error);
    // It's good practice to avoid sending detailed internal error messages to the client
    return res.status(500).json({ error: 'Failed to upload movie due to an internal error' });
  }
}