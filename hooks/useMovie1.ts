import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Movie } from '@/lib/types';

interface UseMovieReturnType {
    data: Movie | null;
    error: any;
    isLoading: boolean;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    rating: number;
    year: number;
    comments: any[];
}

const useMovie = (movieId?: string): UseMovieReturnType => {
    const endpoint = movieId ? `/api/movies/${movieId}` : null;
    
    const { data, error, isValidating } = useSWR<Movie>(endpoint, fetcher, {
        shouldRetryOnError: false, 
        revalidateOnFocus: false
    });

    console.log("Réponse de useSWR:", data, error, isValidating);

    if (movieId) {
        console.log("ID du film:", movieId);
        console.log("Erreur possible sur le hooks usemovie?  : ", error);
        console.log("Données récupérées:", data);
    }

    const isLoading = !data && !error;

    const adjustedVideoUrl = data?.videoUrl ? data.videoUrl.replace('/watch/', '/') : "";
  
    const result: UseMovieReturnType = {
        data: data || null,
        error: error || null,
        isLoading: isLoading,
        title: data?.title || "",
        videoUrl: adjustedVideoUrl || "",
        thumbnailUrl: data?.thumbnailUrl || "",
        rating: data?.rating || 0,
        year: data?.year || 0,
        comments: data?.comments || []
    };
  
    return result;
};

export default useMovie;
