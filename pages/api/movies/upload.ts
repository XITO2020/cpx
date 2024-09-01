import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/videos', // Dossier où les fichiers seront stockés
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('video'));

apiRoute.post((req, res) => {
  const { title, genre, author, thumbnailUrl, description } = req.body;
  const videoPath = req.file.path;

  // Ici, vous pouvez enregistrer les données dans votre base de données
  // Par exemple, en utilisant une base de données SQL ou NoSQL

  res.status(200).json({ message: 'Vidéo envoyée avec succès', videoPath });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Désactiver le bodyParser par défaut de Next.js
  },
};
