import nextConnect from 'next-connect'
import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'
import { CustomSession } from '@/lib/types';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const movieReq = req.body;
  const user = ;

  const movie = await prismadb.movie.create({
    data: {
      title: movieReq.title,
      description: movieReq.title,
      thumbnailUrl: "http://example.com/thumbnail",
      author: user,
      movieGenres: {
        create: movieReq.genres.map((genreId: string) => ({
          genre: {
            connect: {
              id: genreId,
            },
          },
        })),
      },
    },
  });
  

  return res.status(201).json(movie);
}

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './public/videos', // Dossier où les fichiers seront stockés
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   }),
// });
