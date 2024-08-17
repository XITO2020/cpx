import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prismadb from '@/lib/prismadb'
import { User } from '@/lib/types'

// Gestion des requêtes GET et POST
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const comments = await prismadb.comments.findMany()
      return res
        .status(200)
        .json({ message: 'Voici les commentaires', comments })
    } catch (err) {
      return res.status(500).json({ message: 'Error', err })
    } finally {
      await prismadb.$disconnect()
    }
  } else if (req.method === 'POST') {
    try {
      const descr = req.body.description // Assurez-vous d'avoir le bon format pour le corps de la requête
      const authResponse = await serverAuth(req)

      // Vérifiez si l'utilisateur est authentifié
      if (!authResponse.success || !authResponse.currentUser) {
        throw new Error('Unauthorized: User is not authenticated')
      }
      const currentUser: User = authResponse.currentUser
      // On récupère l'id de l'utilisateur qui a posté le commentaire
      let idUser = currentUser.id

      // On crée un nouvel objet pour stocker le nouveau commentaire
      let newComment = {
        description: descr,
        created_at: new Date(),
        updated_at: null,
        author_id: idUser,
      }

      // On ajoute ce commentaire à la base de données
      await prismadb.comment.create({ data: newComment })
      return res
        .status(201)
        .json({ message: 'Le commentaire a bien été enregistré' })
    } catch (err) {
      console.log(err)
      return res
        .status(400)
        .json({
          message: "Erreur lors de l'enregistrement du commentaire",
          err,
        })
    } finally {
      await prismadb.$disconnect()
    }
  } else {
    // Gérer d'autres méthodes ou retourner une erreur 405 Method Not Allowed
    return res.status(405).end('Method Not Allowed')
  }
}
