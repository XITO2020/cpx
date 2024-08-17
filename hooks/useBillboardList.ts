import useSWR from 'swr';
import { Movie } from '@/lib/types'


const fetcherTyped: (url: string) => Promise<Movie[]> = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const useBillboardList = () => {
    const { data, error } = useSWR<Movie[]>('/api/trending', fetcherTyped, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const isLoading = !data && !error;

    return {
        data,
        error,
        isLoading,
    };
};

export default useBillboardList;
