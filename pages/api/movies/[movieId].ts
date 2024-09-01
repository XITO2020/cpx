import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }
  try {
    const userdata = await serverAuth(req, res)
    console.log('mon userdata dans movieId: ', userdata)
    const { movieId } = req.query

    if (typeof movieId !== 'string' || !movieId) {
      throw new Error('Invalid or missing movie ID')
    }

    console.log('movieId from req.query:', movieId)
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    })

    if (!movie) {
      throw new Error('Movie not found')
    }

    res.status(200).json(movie)
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error:', error.message)
      res.status(400).json({ error: error.message })
    } else {
      console.error('Unknown API Error:', error)
      res.status(400).json({ error: 'An unknown error occurred' })
    }
  }
}
