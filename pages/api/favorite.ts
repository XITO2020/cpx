import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { User } from '@/lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await serverAuth(req);
        const currentUser: User | undefined = response.currentUser;

        if (!currentUser) {
            console.log("Error: No current user found");
            return res.status(401).json({ error: "Not authenticated" });
        }

        const { movieId } = req.body;

        console.log("movieId from req.body:", movieId);
        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
    }
});


        if (!existingMovie) {
            console.log("Error: Invalid movie ID");
            return res.status(400).json({ error: "Invalid movie ID" });
        }

        if (req.method === 'POST') {
            console.log("Handling POST request...");
            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email,
                },
                data: {
                    favoriteIds: {
                        push: movieId,
                    }
                }
            });
            return res.status(200).json(user);
        } else if (req.method === 'DELETE') {
            console.log("Handling DELETE request...");
            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email,
                },
                data: {
                    favoriteIds: updatedFavoriteIds,
                },
            });
            return res.status(200).json(updatedUser);
        } else {
            console.log("Error: Invalid request method");
            return res.status(405).json({ error: "Method not allowed" });
        }
    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
