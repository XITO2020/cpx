import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import type { User, CustomSession } from '@/lib/types'; 
import prismadb from '@/lib/prismadb';

type ServerAuthResponse = {
    success: boolean;
    error?: string;
    currentUser?: User;
};

const serverAuth = async (req: NextApiRequest): Promise<ServerAuthResponse> => {
    try {
        const session : CustomSession | null = await getSession({ req }) as CustomSession;

        // Vérifiez si la session est définie et si l'utilisateur est défini dans la session
        if (!session || !session.user) {
            console.log("Utilisateur non authentifié");
            return { success: false, error: "User is not authenticated" };
        }
        console.log("Session User Data:", session.user);

        let user = null;

        // Try finding by email first
        if (session?.user?.email) {
            user = await prismadb.user.findUnique({
                where: {
                    email: session.user.email
                }
            });
        }

        // If user is still not found and they logged in via GitHub, try by GitHub username (assuming you store GitHub usernames in the 'name' field)
        if (!user && session?.user?.provider === "github" && session?.user?.name) {
            user = await prismadb.user.findUnique({
                where: {
                    name: session.user.name
                }
            });
        }

        if (!user) {
            console.log("User not found in the database for identification:", session?.user?.name || session?.user?.email);
            return { success: false, error: "No user found!" };
        }
        
        return { success: true, currentUser: user };
    } catch (err) {
        console.error("Error in serverAuth:", err);
        if (err instanceof Error) {
            return { success: false, error: err.message };
        } else {
            return { success: false, error: "An unknown error occurred" };
        }
    }
};

export default serverAuth;
