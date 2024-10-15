import React from 'react';
import { useRouter } from 'next/router';
import { MovieGenre } from '@/lib/types';

interface ExausterProps {
  movieGenres: MovieGenre[];
}

const Exauster: React.FC<ExausterProps> = ({ movieGenres }) => {
  const router = useRouter();

  const handleOnClick = () => {
    const genres = movieGenres.map(genre => genre.genre.name.replace(/\s+/g, '-')).join(',');
    router.push(`/toutVoir/${genres}`);
  };

  return (
    <button onClick={handleOnClick} className="font-bebas font-extrabold hover:bg-neutral-800 text-rose-400 bold px-4 py-2
     rounded-sm opacity-40 hover:opacity-80 bg-neutral-600 hover:text-rose-600 hover:font-black
      uppercase hover:drop-shadow-lg">
      Tout voir concernant <span className="text-white">
        {movieGenres.map(genre => genre.genre.name).join(', ')}
      </span>
    </button>
  );
};

export default Exauster;
