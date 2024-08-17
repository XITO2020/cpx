import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'


// SERT A AFFICHER LA LISTE DES FAVORIS
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end()
    }

    const { currentUser } = await serverAuth(req, res)

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds || [],
        },
      },
    })

    return res.status(200).json(favoriteMovies)
  } catch (error) {
    console.error('Error in /api/favorites:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
