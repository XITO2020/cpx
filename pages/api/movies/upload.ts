import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { authOptions } from '../auth/[...nextauth]';

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
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prismadb.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, admin: true }
    });

    if (!user?.admin) {
      return res.status(403).json({ error: 'Only admins can upload movies' });
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
    return res.status(500).json({ error: 'Failed to upload movie' });
  }
}