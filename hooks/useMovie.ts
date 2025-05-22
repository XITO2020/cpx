import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Movie } from '@/lib/types';

const useMovie = (movieId?: string) => {
  const { 
    data, 
    error, 
    isLoading, 
    mutate 
  } = useSWR<Movie>(
    movieId ? `/api/movies/${movieId}` : null, 
    fetcher
  );

  return {
    movie: data,
    error,
    isLoading,
    mutate,
  };
};

export default useMovie;