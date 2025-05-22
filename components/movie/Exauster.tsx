import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { MovieGenre } from '@/lib/types';

interface ExausterProps {
  movieGenres: MovieGenre[];
}

const Exauster: React.FC<ExausterProps> = ({ movieGenres }) => {
  const router = useRouter();

  const handleOnClick = () => {
    const genres = movieGenres
      .map(genre => genre.genre.name.replace(/\s+/g, '-'))
      .join(',');
    router.push(`/toutVoir/${genres}`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleOnClick}
      className="font-bebas font-extrabold text-rose-400 px-4 py-2
                rounded-sm bg-neutral-600 hover:bg-neutral-800
                hover:text-rose-600 hover:font-black uppercase
                transition-all duration-300 opacity-40 hover:opacity-80
                hover:shadow-lg hover:shadow-rose-500/20"
    >
      Tout voir concernant{' '}
      <span className="text-white">
        {movieGenres.map(genre => genre.genre.name).join(', ')}
      </span>
    </motion.button>
  );
};

export default Exauster;