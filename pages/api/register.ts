import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 1. Vérifiez la réception des données côté serveur
    console.log("API register endpoint hit");
    console.log("Data received in request:", req.body);

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { email, name, password } = req.body;

        // 2. Vérifiez si les données nécessaires sont présentes
        if (!email || !name || !password) {
            console.log("Missing required data in request.");
            return res.status(400).json({ error: 'Missing required data in request.' });
        }

        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            },
        });

        // 3. Vérifiez si l'utilisateur existe déjà
        if (existingUser) {
            console.log("User already exists with email:", email);
            return res.status(422).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        console.log("Hashed password:", hashedPassword);
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: true,
            }
        });
        console.log("User created:", user);

        // 4. Vérifiez si l'utilisateur a été créé avec succès
        if (!user) {
            console.log("Failed to create user.");
            return res.status(500).json({ error: 'Failed to create user.' });
        }

        console.log("User created successfully:", user);
        return res.status(200).json(user);

    } catch (error) {
        // 5. Affichez les erreurs pour déboguer
        console.log("Error during user registration:", error);
    
        if (error instanceof Error) {
            console.log("Error message:", error.message);
            console.log("Error stack:", error.stack);
            return res.status(400).json({ 
                error: error.message,
                details: error.stack 
            });
        } else {
            return res.status(400).json({ 
                error: "Une erreur inconnue s'est produite",
                details: String(error)
            });
        }
    }
}
