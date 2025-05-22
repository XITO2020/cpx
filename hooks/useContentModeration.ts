import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const useContentModeration = (type: 'videos' | 'articles' | 'comments') => {
  const { data, error, mutate } = useSWR(
    `/api/admin/moderation/${type}`,
    fetcher
  );

  const approveContent = async (id: string) => {
    try {
      await fetch(`/api/admin/moderation/${type}/${id}/approve`, {
        method: 'POST'
      });
      mutate();
    } catch (error) {
      console.error('Error approving content:', error);
      throw error;
    }
  };

  const rejectContent = async (id: string) => {
    try {
      await fetch(`/api/admin/moderation/${type}/${id}/reject`, {
        method: 'POST'
      });
      mutate();
    } catch (error) {
      console.error('Error rejecting content:', error);
      throw error;
    }
  };

  return {
    pendingContent: data || [],
    isLoading: !error && !data,
    error,
    approveContent,
    rejectContent
  };
};