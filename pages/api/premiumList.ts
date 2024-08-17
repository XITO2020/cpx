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
    await serverAuth(req, res)

    // Récupérer les films marqués comme "trending" (modifiez ceci en fonction de votre structure de base de données)
    const trendingMovies = await prismadb.movie.findMany({
      where: {
        isTrending: true,
      },
      take: 10, // Limité à 10 films
    })

    return res.status(200).json(trendingMovies)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
