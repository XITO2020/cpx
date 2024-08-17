import useSWR from 'swr'
import fetcher from '@/lib/fetcher';
import { Movie } from '@/lib/types';

const useMovies = () => {
  const { data, error, isLoading } = useSWR<Movie[]>('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useMovies;
