import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Movie } from '@/lib/types';

interface UseStationMovieOptions {
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  revalidateIfStale?: boolean;
}

const useStationMovie = (
  id?: string, 
  options: UseStationMovieOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }
) => {
  const { 
    data, 
    error, 
    isLoading,
    mutate 
  } = useSWR<Movie>(
    id ? `/api/movies/${id}` : null, 
    fetcher,
    options
  );

  return {
    movie: data,
    error,
    isLoading,
    mutate
  };
};

export default useStationMovie;