import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { locale } = req.query;

    const movies = await prismadb.movie.findMany({
      where: {
        language: locale as string
      },
      include: {
        movieGenres: {
          include: {
            genre: true
          }
        }
      }
    });

    return res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching localized movies:', error);
    return res.status(500).json({ error: 'Failed to fetch localized movies' });
  }
}