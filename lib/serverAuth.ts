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
    // Récupère la session du serveur
    const session = await getServerSession(req, res, authOptions);

    // Vérifie si l'utilisateur est connecté en vérifiant si son email est défini dans la session
    if (!session?.user?.email) {
      throw new Error('Not signed in');
    }

    // Recherche l'utilisateur dans la base de données en fonction de son email
    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    // Vérifie si l'utilisateur existe dans la base de données
    if (!currentUser) {
      throw new Error('User not found in the database');
    }

    // Créé une instance de CustomSession avec l'utilisateur trouvé
    const customSession: CustomSession = {
      ...session,
      user: currentUser,
      admin: currentUser.admin,
      email: currentUser.email ?? '',
      emailVerified: currentUser.emailVerified ?? false,
    };

    return { customSession }; // Retourne l'instance de CustomSession
  } catch (error: any) {
    console.error('Error in serverAuth:', error);
    throw new Error('Error in serverAuth: ' + error.message); // Lance une erreur avec un message explicite
  }
};

export default serverAuth;
