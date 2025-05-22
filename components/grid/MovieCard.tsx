import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Movie } from '@/lib/types';

interface MovieCardProps {
  movie: Movie;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <motion.div
      variants={item}
      className="thumbnail"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-xl font-semibold mb-4">{movie.title}</h3>
      
      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
        <img
          src={movie.thumbnailUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-gray-300 mb-2">Catégorie: {movie.category}</p>
      
      {movie.description && (
        <p className="text-gray-400 text-sm mb-4">{movie.description}</p>
      )}

      <Link href="/auth">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700 transition-colors"
        >
          Voir film
        </motion.button>
      </Link>
    </motion.div>
  );
};