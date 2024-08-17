import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { CustomSession } from "@/lib/types";
import prismadb from '@/lib/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/**
 * Fonction utilisée pour authentifier les utilisateurs sur le serveur.
 * Récupère les informations de session et cherche l'utilisateur correspondant dans la base de données.
 */
const serverAuth = async (req: NextApiRequest, res: NextApiResponse): Promise<{ customSession: CustomSession }> => {
  try {
    // Récupérer la session du serveur
    const session = await getServerSession(req, res, { ...authOptions, strategy: 'jwt' });

    // Vérifier si l'utilisateur est connecté en vérifiant si son email est défini dans la session
    if (!session?.user?.email) {
      throw new Error('Not signed in');
    }

    // Rechercher l'utilisateur dans la base de données en fonction de son email
    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      }
    });

    // Vérifier si l'utilisateur existe dans la base de données
    if (!currentUser) {
      throw new Error('User not found in the database');
    }

    // Vérifier si l'utilisateur est un administrateur
    if (currentUser.admin !== true) {
      throw new Error('User is not an administrator');
    }

    // Créer une instance de CustomSession avec l'utilisateur trouvé
    const customSession: CustomSession = {
      ...session,
      user: currentUser // Assurez-vous que currentUser a la propriété 'name'
    };

    return { customSession }; // Retourner l'instance de CustomSession
  } catch (error: any) {
    console.error('Error in serverAuth:', error);
    throw new Error('Error in serverAuth: ' + error.message); // Lancer une erreur avec un message explicite
  }
}

export default serverAuth;
