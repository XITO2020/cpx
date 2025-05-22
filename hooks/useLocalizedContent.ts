import { useEffect, useState } from 'react';
import { useRouter } from 'next-intl/client';
import { Movie } from '@/lib/types';

export const useLocalizedContent = () => {
  const router = useRouter();
  const [localizedMovies, setLocalizedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocalizedContent = async () => {
      try {
        const response = await fetch(`/api/movies/localized?locale=${router.locale}`);
        const data = await response.json();
        setLocalizedMovies(data);
      } catch (error) {
        console.error('Error fetching localized content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocalizedContent();
  }, [router.locale]);

  return {
    localizedMovies,
    isLoading,
  };
};