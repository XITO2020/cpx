import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { LinkedArticle } from '@/lib/types';

interface ArticleListResponse {
  articles: LinkedArticle[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
  };
}

export const useArticles = (
  page = 1,
  limit = 10,
  movieId?: string,
  authorId?: string
) => {
  const { 
    data, 
    error, 
    isLoading,
    mutate 
  } = useSWR<ArticleListResponse>(
    `/api/articles?page=${page}&limit=${limit}${movieId ? `&movieId=${movieId}` : ''}${authorId ? `&authorId=${authorId}` : ''}`,
    fetcher
  );

  const createArticle = async (articleData: Partial<LinkedArticle>) => {
    try {
      const response = await fetch('/api/articles/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) throw new Error('Failed to create article');

      const newArticle = await response.json();
      mutate();
      
      return newArticle;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  };

  const deleteArticle = async (articleId: string) => {
    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete article');

      mutate();
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  };

  return {
    articles: data?.articles || [],
    pagination: data?.pagination,
    error,
    isLoading,
    createArticle,
    deleteArticle,
    mutate,
  };
};