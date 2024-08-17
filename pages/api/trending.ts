import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }
    
    try {
        // Récupérer les films marqués comme "trending" (modifiez ceci en fonction de votre structure de base de données)
        const trendingMovies = await prismadb.movie.findMany({
            where: {
                isTrending: true,
            },
            take: 10,  // Limité à 10 films
        });

        return res.status(200).json(trendingMovies);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
    
}
