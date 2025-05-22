import React from 'react';
import { motion } from 'framer-motion';
import { MovieGrid } from './MovieGrid';
import { Header } from './Header';
import { useMovieList } from '@/hooks/useMovieList';

const GridThumbnails: React.FC = () => {
  const { movies, isLoading } = useMovieList();

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-rose-500 rounded-full border-t-transparent"
          />
        </div>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </div>
  );
};

export default GridThumbnails;