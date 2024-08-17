import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb'; // Assurez-vous que ce fichier existe et est correctement configuré.

export default async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const { title, year, genre, rating, description } = req.query;

    const movieConditions: any = {};
    const articleConditions: any = {};

    if (title) {
        movieConditions.title = { contains: title as string, mode: 'insensitive' };
        articleConditions.title = { contains: title as string, mode: 'insensitive' };
    }
    if (year) movieConditions.year = Number(year);
    if (genre) movieConditions.genre = { contains: genre as string, mode: 'insensitive' };
    if (rating) movieConditions.rating = { gte: Number(rating) };
    if (description) {
        movieConditions.description = { contains: description as string, mode: 'insensitive' };
        articleConditions.description = { contains: description as string, mode: 'insensitive' };
    }

    try {
        const movies = await prisma.movie.findMany({ where: movieConditions });
        const articles = await prisma.linkedArticle.findMany({ where: articleConditions });

        res.status(200).json({ movies, articles });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}
