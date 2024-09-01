import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { CustomSession } from "@/lib/types";
import prismadb from '@/lib/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/**
 * Fonction utilisée pour authentifier les utilisateurs sur le serveur.
 * Récupère les informations de session PLUS D AUTRE DE LA BDD si je veux, car
 * elle cherche l'utilisateur correspondant dans la base de données.
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

    // Créer une instance de CustomSession avec l'utilisateur trouvé
    const customSession: CustomSession = {
      ...session,
      user: {
        ...currentUser,
        admin: currentUser.admin, // ça e été une galère ici, il fallait s assurer que la proprété admin était incluse dans user
      }
    };

    return { customSession }; // Retourner l'instance de CustomSession
  } catch (error: any) {
    console.error('Error in serverAuth:', error);
    throw new Error('Error in serverAuth: ' + error.message); // Lancer une erreur avec un message explicite
  }
}

export default serverAuth;


/**
 * Résumé

    1 serverAuth récupère la session et l'utilisateur de la base de données, 
    et crée une instance de CustomSession basée sur l'user trouvé.
    
    2 current.ts utilise serverAuth pour obtenir l'instance de customSession et renvoie ces données via l'API.
    
    3 useCurrentUser fait une requête à l'API /api/current pour obtenir les informations de l'utilisateur courant.

    4 sessionContext fournit les données de session à toute l'application via un contexte React.
    
    5 CustomSession étend la session par défaut de next-auth avec des propriétés personnalisées, 
    incluant un objet user.

En suivant cette structure, je m'assure que toutes les propriétés personnalisées
de CustomSession sont correctement passées et accessibles dans toute l'application.
 */