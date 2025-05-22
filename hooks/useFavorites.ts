import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Movie } from '@/lib/types';

const useFavorites = () => {
  const { 
    data, 
    error, 
    isLoading, 
    mutate 
  } = useSWR<Movie[]>('/api/favorites', fetcher);

  return {
    favorites: data || [],
    error,
    isLoading,
    mutate,
  };
};

export default useFavorites;