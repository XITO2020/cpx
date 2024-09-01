import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb'; // Assurez-vous que ce fichier existe et est correctement configuré.

export default async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const { query } = req.query;

    const movieConditions: any = {};
    const articleConditions: any = {};
    const authorConditions: any = {};

    if (query) {
        movieConditions.title = { contains: query as string, mode: 'insensitive' };
        articleConditions.title = { contains: query as string, mode: 'insensitive' };
        authorConditions.name = { contains: query as string, mode: 'insensitive' };
    }

    try {
        const movies = await prisma.movie.findMany({ where: movieConditions });
        const articles = await prisma.linkedArticle.findMany({ where: articleConditions });
        const authors = await prisma.author.findMany({ where: authorConditions });

        res.status(200).json({ movies, articles, authors });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}
