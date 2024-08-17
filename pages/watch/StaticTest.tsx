import { useRouter } from 'next/router';

const StaticTest = () => {
  const router = useRouter();
  const { movieID } = router.query;

  // Pour le test, utilisons une URL de vidéo fixe. 
  // Remplacez ceci par l'URL dynamique une fois que le test fonctionne.
  const videoUrl = `http://localhost:3000/videos/autoproduction/avcnews_2.mp4`;

  return (
    <div className="bg-yellow-300">
      <h1 className="text-white">Watch Movie: {movieID}</h1>
      <video width="320" height="240" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default StaticTest;
