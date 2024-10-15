import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { CustomSession } from '@/lib/types';
import prismadb from '@/lib/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const serverAuth = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{ customSession: CustomSession }> => {
  try {
    // Récupérer la session du serveur
    const session = await getServerSession(req, res, authOptions);

    // Vérifier si l'utilisateur est connecté en vérifiant si son email est défini dans la session
    if (!session?.user?.email) {
      throw new Error('Not signed in');
    }

    // Rechercher l'utilisateur dans la base de données en fonction de son email
    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    // Vérifier si l'utilisateur existe dans la base de données
    if (!currentUser) {
      throw new Error('User not found in the database');
    }

    // Créer une instance de CustomSession avec l'utilisateur trouvé
    const customSession: CustomSession = {
      ...session,
      user: currentUser,
      admin: currentUser.admin,
      email: currentUser.email ?? '',
      emailVerified: currentUser.emailVerified ?? false,
    };

    return { customSession }; // Retourner l'instance de CustomSession
  } catch (error: any) {
    console.error('Error in serverAuth:', error);
    throw new Error('Error in serverAuth: ' + error.message); // Lancer une erreur avec un message explicite
  }
};

export default serverAuth;
