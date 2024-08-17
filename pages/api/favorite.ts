import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prismadb from '@/lib/prismadb';
import type {CustomSession} from '@/lib/types'

// SERT A AJOUTER DES FAVORIS A L UTILISATEUR
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end();
    }

    const session: CustomSession | null = await getSession({ req }) as CustomSession;
    console.log(session.user)
    if (!session || !session.user || !session.user.id) {
        return res.status(401).json({ error: "User not auth-ed in favorite.ts" });
        
    }
    console.log("session recupérée dans favorite.ts: ",session)
    const userId = session.user['id'];
    const { movieId } = req.body;

    try {
        if (req.method === 'POST') {
            // Ajoutez le movieId aux favoris de l'utilisateur
            await prismadb.user.update({
                where: { id: userId },
                data: { favoriteIds: { push: movieId } },
            });
        } else if (req.method === 'DELETE') {
            // Supprimez le movieId des favoris de l'utilisateur
            await prismadb.user.update({
                where: { id: userId },
                data: { favoriteIds: { set: [] } },
            });
        }

        return res.status(200).json({ message: "Favorite updated successfully" });
    } catch (error) {
        console.error("Error in /api/favorite:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
