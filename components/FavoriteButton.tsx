import axios from 'axios';
import React, { useCallback, useMemo } from 'react';


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
    let response;

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({ 
      ...currentUser, 
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);
  

  return (
    <div onClick={toggleFavorites} className={`cursor-pointer 
    group/item w-16 h-16 lg:w-10 lg:h-10 
    ${index % 4 === 0 ? 'text-fuchsia-600' :
                        index % 4 === 1 ? 'text-yellow-400' :
                            index % 4 === 2 ? 'text-emerald-800' :
                                     'text-violet-800'}
     border-white border-2 rounded-full flex justify-center
      items-center transition hover:border-neutral-300`}>
      <p className="text-3xl relative -top-1">+</p>
    </div>
  )
}

export default FavoriteButton;
