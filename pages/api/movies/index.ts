import { NextApiRequest, NextApiResponse } from 'next'

import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  try {
    const userdata = await serverAuth(req, res)
    console.log('mon userdata dans movies/index: ', userdata)

    const movies = await prismadb.movie.findMany({
      include: {
        movieGenres: {
          include: {
            genre: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    console.log('Données de films récupérées de la base de données :', movies);
    
    return res.status(200).json(movies)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
