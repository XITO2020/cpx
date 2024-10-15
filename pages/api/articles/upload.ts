import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import prismadb from '@/lib/prismadb';
import { getSession } from 'next-auth/react';
import { CustomSession } from '@/lib/types';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/articles', // Dossier où les fichiers seront stockés
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

const uploadMiddleware = upload.single('video');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getSession({ req });
  const user = session?.user as CustomSession; // Assurez-vous que l'utilisateur est authentifié

  if (!user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const articleReq = req.body;

  try {
    const article = await prismadb.linkedArticle.create({
      data: {
        title: articleReq.title,
        description: articleReq.description,
        userId: user.id,
        movieId: articleReq.movieId,
        imageOne: articleReq.thumbnailUrl,
      },
    });

    return res.status(201).json(article);
  } catch (error) {
    console.error('Erreur lors de la création de l\'article', error);
    return res.status(500).json({ error: 'Erreur lors de la création de l\'article' });
  }
};

export const config = {
  api: {
    bodyParser: false, // Désactive le bodyParser intégré pour utiliser multer
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      console.error('Erreur lors du téléchargement du fichier', err);
      return res.status(500).json({ error: 'Erreur lors du téléchargement du fichier' });
    }
    handler(req, res);
  });
};
