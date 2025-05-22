import { useState, useCallback } from 'react';
import { Movie, LinkedArticle, User } from '@/lib/types';

interface SearchResults {
  movies: Movie[];
  articles: LinkedArticle[];
  authors: User[];
  isLoading: boolean;
  error: Error | null;
}

export const useSearch = () => {
  const [results, setResults] = useState<SearchResults>({
    movies: [],
    articles: [],
    authors: [],
    isLoading: false,
    error: null
  });

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults({
        movies: [],
        articles: [],
        authors: [],
        isLoading: false,
        error: null
      });
      return;
    }

    setResults(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      setResults({
        ...data,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setResults(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Search failed')
      }));
    }
  }, []);

  return {
    ...results,
    search
  };
};