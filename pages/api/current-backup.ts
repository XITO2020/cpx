import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'

/**
current.ts est un gestionnaire API qui utilise
 serverAuth pour récupérer les informations de l'utilisateur 
 courant et les renvoie comme réponse JSON. UseCurrentUser traitera le JSON
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Request received at /api/current')
  try {
    if (req.method !== 'GET') {
      console.log('Not a GET request')
      return res.status(405).end()
    }
    // Modification: Utiliser customSession au lieu de currentUser
    const { customSession } = await serverAuth(req, res)
    console.log('User found:', customSession.user) // Modification: Assurez-vous que customSession.user existe
    return res.status(200).json(customSession) // Modification: Retourner customSession en réponse
  } catch (error: any) {
    // Changement de type pour 'error'
    console.error('Error in /api/current:', error)
    return res.status(500).end() // Erreur serveur
  }
}
