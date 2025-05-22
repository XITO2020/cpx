import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string;
  index: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, index }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    try {
      const response = await fetch('/api/favorites', {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId }),
      });

      if (!response.ok) throw new Error('Failed to toggle favorite');

      const { favoriteIds } = await response.json();
      mutate({ ...currentUser, favoriteIds });
      mutateFavorites();
    } catch (error) {
      console.error('Toggle favorite error:', error);
    }
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const buttonColor = [
    'text-fuchsia-600',
    'text-yellow-400',
    'text-emerald-800',
    'text-violet-800'
  ][index % 4];

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleFavorites}
      className={`cursor-pointer w-16 h-16 lg:w-10 lg:h-10 ${buttonColor}
                 border-white border-2 rounded-full flex justify-center items-center
                 transition hover:border-neutral-300`}
    >
      <span className="text-3xl relative -top-1">
        {isFavorite ? '✓' : '+'}
      </span>
    </motion.button>
  );
};

export default FavoriteButton;