import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Movie } from '@/lib/types';
import MovieCard from '../movie/MovieCard';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ScoredMovie extends Movie {
  scoreByRating: number;
  scoreByFavorites: number;
  scoreByViews: number;
}

type SortCriteria = 'rating' | 'favorites' | 'views';

const calculateScores = (movies: Movie[]): ScoredMovie[] => {
  return movies.map(movie => ({
    ...movie,
    scoreByRating: movie.rating || 0,
    scoreByFavorites: movie.favoriteLength || 0,
    scoreByViews: movie.views || 0,
  }));
};

const Top100: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [top100Movies, setTop100Movies] = useState<ScoredMovie[]>([]);
  const [criteria, setCriteria] = useState<SortCriteria>('rating');
  const [verificationLevelFilter, setVerificationLevelFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies/index');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const scoredMovies = calculateScores(movies);
      const filteredMovies = verificationLevelFilter
        ? scoredMovies.filter(movie => movie.verificationLevel === 7)
        : scoredMovies;

      const sortedMovies = filteredMovies.sort((a, b) => {
        switch (criteria) {
          case 'rating':
            return b.scoreByRating - a.scoreByRating;
          case 'favorites':
            return b.scoreByFavorites - a.scoreByFavorites;
          case 'views':
            return b.scoreByViews - a.scoreByViews;
          default:
            return 0;
        }
      });

      setTop100Movies(sortedMovies.slice(0, 100));
    }
  }, [movies, criteria, verificationLevelFilter]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-[70%] mx-auto pt-40 mt-5"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold text-white mb-8 text-center"
      >
        Top 100 Films
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between mb-8"
      >
        {[
          { value: 'rating', label: 'Mieux notés', color: 'bg-pink-600' },
          { value: 'favorites', label: 'Plus mis en favoris', color: 'bg-purple-600' },
          { value: 'views', label: 'Plus vus', color: 'bg-yellow-400' },
        ].map(({ value, label, color }) => (
          <motion.label
            key={value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-7 ${color} rounded-lg cursor-pointer flex items-center gap-2`}
          >
            <input
              type="radio"
              value={value}
              checked={criteria === value}
              onChange={() => setCriteria(value as SortCriteria)}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded-full border-2 ${criteria === value ? 'bg-white' : ''}`} />
            <span className="text-white font-medium">{label}</span>
          </motion.label>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <label className="flex items-center gap-2 text-white cursor-pointer">
          <input
            type="checkbox"
            checked={verificationLevelFilter}
            onChange={() => setVerificationLevelFilter(!verificationLevelFilter)}
            className="form-checkbox h-5 w-5 text-rose-500 rounded"
          />
          <span>Filtrer uniquement les films au niveau de certification maximum</span>
        </label>
      </motion.div>

      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {top100Movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <MovieCard data={movie} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Top100;