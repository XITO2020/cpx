import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { User } from '@/lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }
    try{
        const response = await serverAuth(req);
        const currentUser: User | undefined = response.currentUser;

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id : {
                    in : currentUser?.favoriteIds,
                }
            }
        });
        return res.status(200).json(favoriteMovies);
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}