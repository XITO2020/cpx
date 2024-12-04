import { NextApiRequest, NextApiResponse } from 'next'
import { Movie } from '@/lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Movie[] | { error: string }>
) {
  try {
    // Logique pour récupérer les films
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
}
