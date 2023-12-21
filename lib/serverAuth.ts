import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { User } from '@/lib/types'; 
import prismadb from '@/lib/prismadb';

type ServerAuthResponse = {
    success: boolean;
    error?: string;
    currentUser?: User;
};

const serverAuth = async (req: NextApiRequest): Promise<ServerAuthResponse> => {
    try {
        const session = await getSession({ req });
        console.log("Session:", session); // Log pour vérifier la session

        if (!session?.user?.email) {
            console.log("No session or email found in session."); // Log en cas d'absence de session ou d'email
            return { success: false, error: "Not Signed in!" };
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email,
            },
        });
        console.log("Current User from DB:", currentUser); // Log pour vérifier l'utilisateur récupéré de la base de données

        if (!currentUser) {
            console.log("User not found in the database for email:", session.user.email); // Log si l'utilisateur n'est pas trouvé
            return { success: false, error: "No user found!" };
        }

        return { success: true, currentUser };
    } catch (err) {
        console.error("Error in serverAuth: TOUJOURS INGERABLE", err); // Log pour toute autre erreur
        if (err instanceof Error) {
            return { success: false, error: err.message };
        } else {
            return { success: false, error: "An unknown error occurred" };
        }
    }
};

export default serverAuth;
