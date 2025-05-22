import React from 'react';
import { motion } from 'framer-motion';
import { MovieCard } from './MovieCard';
import type { Movie } from '@/lib/types';

interface MovieGridProps {
  movies: Movie[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="vitrine bg-green-950 mx-auto w-[90%] mt-8 p-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-black border-2 text-white"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </motion.div>
  );
};