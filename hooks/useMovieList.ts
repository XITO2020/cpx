import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useMovieList = () => {
    const { data, error, isLoading } = useSWR('/api/movies', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    console.log("Data from useMovieList:", data);
    console.log("Error from useMovieList:", error);
    console.log("Is loading from useMovieList:", isLoading);

    return {
        data,
        error,
        isLoading,
    }
}

export default useMovieList;