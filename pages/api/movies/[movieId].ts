//J'ai fait ajouter des coms par l'ia Mistral parce que je ne comprends pas 
//pourquoi je ne récupèrais pas le film dans watch/


// Importez les types de requête et de réponse de Next.js
import { NextApiRequest, NextApiResponse } from 'next'
// Importez votre instance Prisma pour interagir avec votre base de données
import prismadb from '@/lib/prismadb'
// Importez votre fonction d'authentification du serveur
import serverAuth from '@/lib/serverAuth'

// Définissez votre gestionnaire de requêtes API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérifiez que la méthode de requête est GET
  if (req.method !== 'GET') {
    // Si ce n'est pas le cas, renvoyez une erreur 405 (Method Not Allowed)
    res.status(405).end()
    return
  }

  try {
    // Utilisez votre fonction d'authentification du serveur pour vérifier l'authentification de l'utilisateur
    const userdata = await serverAuth(req, res)
    console.log('mon userdata dans movieId: ', userdata)

    // Extrayez l'ID du film de la requête
    const { movieId } = req.query

    // Vérifiez que l'ID du film est une chaîne de caractères valide et non vide
    if (typeof movieId !== 'string' || !movieId) {
      throw new Error('Invalid or missing movie ID')
    }

    console.log('movieId from req.query:', movieId)

    // Utilisez Prisma pour rechercher le film dans la base de données
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
      include: {
        movieGenres: {
          include: {
            genre: true,
          },
        },
      },
    });
    // Si le film n'est pas trouvé, lancez une erreur
    if (!movie) {
      throw new Error('Movie not found')
    }

    // Si le film est trouvé, renvoyez-le dans la réponse avec un code de statut 200
    res.status(200).json(movie)
  } catch (error) {
    // Si une erreur se produit, journalisez-la dans la console
    if (error instanceof Error) {
      console.error('API Error:', error.message)
      // Et renvoyez-la dans la réponse avec un code de statut 400
      res.status(400).json({ error: error.message })
    } else {
      console.error('Unknown API Error:', error)
      res.status(400).json({ error: 'An unknown error occurred' })
    }
  }
}
