import useSWR from 'swr'
import fetcher from '@/lib/fetcher';
import { Movie } from '@/lib/types';

const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSWR<Movie>(id ? `/api/movies/${id}` : null, fetcher, {
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

export default useMovie;
