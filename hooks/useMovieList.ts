import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Movie } from '@/lib/types';

interface MovieListResponse {
  movies: Movie[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
  };
}

const useMovieList = (
  page = 1,
  limit = 10,
  genre?: string,
  search?: string
) => {
  const { 
    data, 
    error, 
    isLoading, 
    mutate 
  } = useSWR<MovieListResponse>(
    `/api/movies?page=${page}&limit=${limit}${genre ? `&genre=${genre}` : ''}${search ? `&search=${search}` : ''}`,
    fetcher
  );

  return {
    movies: data?.movies || [],
    pagination: data?.pagination,
    error,
    isLoading,
    mutate,
  };
};

export default useMovieList;