import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Movie } from '@/lib/types';  // Importez le type Movie

export interface UseFavoritesResponse {
    data? : Movie[];
    error: any; // Vous pouvez spécifier un type d'erreur plus précis si vous le souhaitez
    isLoading: boolean;
    mutate: Function; // Vous pouvez également spécifier un type plus précis pour cette fonction
  }

const useFavorites = (): UseFavoritesResponse => {
    const { 
        data, 
        error, 
        isLoading, 
        mutate
    } = useSWR<Movie[]>('/api/favorites', fetcher, {  // Utilisez le type Movie[] ici
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useFavorites;
