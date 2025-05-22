import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { 
      genre,
      search,
      sort = 'createdAt',
      order = 'desc',
      page = '1',
      limit = '10'
    } = req.query;

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    const whereClause: any = {};

    if (genre) {
      whereClause.movieGenres = {
        some: {
          genre: {
            name: genre
          }
        }
      };
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [movies, total] = await Promise.all([
      prismadb.movie.findMany({
        where: whereClause,
        include: {
          movieGenres: {
            include: {
              genre: true
            }
          }
        },
        orderBy: {
          [sort as string]: order
        },
        skip,
        take: limitNumber
      }),
      prismadb.movie.count({ where: whereClause })
    ]);

    const totalPages = Math.ceil(total / limitNumber);

    return res.status(200).json({
      movies,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalItems: total,
        hasMore: pageNumber < totalPages
      }
    });
  } catch (error) {
    console.error('[Movies API Error]:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}