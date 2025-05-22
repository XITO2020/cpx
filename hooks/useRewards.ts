import useSWR from 'swr';
import { Reward } from '@/lib/types';
import fetcher from '@/lib/fetcher';

export const useRewards = () => {
  const { data, error, mutate } = useSWR<Reward[]>('/api/rewards', fetcher);

  const claimReward = async (rewardId: string) => {
    try {
      const response = await fetch(`/api/rewards/${rewardId}/claim`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to claim reward');
      }

      mutate();
      return await response.json();
    } catch (error) {
      console.error('Error claiming reward:', error);
      throw error;
    }
  };

  return {
    rewards: data || [],
    isLoading: !error && !data,
    error,
    claimReward,
  };
};