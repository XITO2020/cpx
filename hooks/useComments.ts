import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Comment } from '@/lib/types';

interface UseCommentsProps {
  movieId: string;
}

export const useComments = ({ movieId }: UseCommentsProps) => {
  const { 
    data: comments, 
    error, 
    isLoading,
    mutate 
  } = useSWR<Comment[]>(
    movieId ? `/api/movies/${movieId}/comments` : null,
    fetcher
  );

  const addComment = async (content: string) => {
    try {
      const response = await fetch(`/api/movies/${movieId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error('Failed to add comment');

      const newComment = await response.json();
      mutate([...(comments || []), newComment]);
      
      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/movies/${movieId}/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete comment');

      mutate(comments?.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };

  return {
    comments: comments || [],
    error,
    isLoading,
    addComment,
    deleteComment,
    mutate,
  };
};