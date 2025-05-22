import React from 'react';
import { motion } from 'framer-motion';
import { Movie } from '@/lib/types';
import MovieCard from '../movie/MovieCard';

interface FavoritesProps {
  movies: Movie[];
}

const Favorites: React.FC<FavoritesProps> = ({ movies }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Favorites</h1>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MovieCard data={movie} index={index} />
          </motion.div>
        ))}

        {movies.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            No favorites added yet
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Favorites;