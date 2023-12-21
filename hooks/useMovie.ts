import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useMovie = (id?:string) =>{
    console.log("ID du film:", id);
    const { 
        data, 
        error, 
        isLoading 
    } = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,

    });

    console.log("Données récupérées:", data);
    return {
        data,
        error,
        isLoading
    }
};

export default useMovie;