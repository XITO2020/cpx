import { clear } from 'console';
import { useState, useEffect } from 'react';

const useMovieList = () => {
    const [data, setData] = useState<[]>([]);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/movies');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    console.log("Data from useMovieList (simplified):", data);
    console.log("Error from useMovieList (simplified):", error);
    console.log("Is loading from useMovieList (simplified):", isLoading);

    return {
        data,
        error,
        isLoading,
    }
}

export default useMovieList;
