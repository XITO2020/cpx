import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

interface Subscription {
  plan: string;
  status: 'active' | 'cancelled' | 'failed';
  endDate: string;
}

const useSubscription = () => {
  const { 
    data, 
    error, 
    isLoading, 
    mutate 
  } = useSWR<Subscription>('/api/subscription', fetcher);

  return {
    subscription: data,
    isActive: data?.status === 'active',
    error,
    isLoading,
    mutate,
  };
};

export default useSubscription;