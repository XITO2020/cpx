import React from 'react';
import { motion } from 'framer-motion';
import useMovie from '@/hooks/useMovie';
import { Movie } from "@/lib/types";
import LoadingSpinner from '../ui/LoadingSpinner';

interface CategoryGridProps {
  genre: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ genre }) => {
  const { data: movies, error, isLoading } = useMovie();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error: {error.message}
      </div>
    );
  }

  const genreMovies = movies?.filter((movie: Movie) => movie.genre === genre) || [];

  if (genreMovies.length === 0) {
    return (
      <div className="text-center text-gray-400 p-8">
        No movies available for this genre.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {genreMovies.map((movie: Movie) => (
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="relative aspect-video">
            <img
              src={movie.thumbnailUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          <div className="p-4">
            <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
            <div className="space-y-1 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <span className="text-rose-500">Year:</span> {movie.year}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-rose-500">Duration:</span> {movie.duration}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-rose-500">Rating:</span> {movie.rating}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryGrid;