import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { User } from '@/lib/types';

const useCurrentUser = () => {
  const { 
    data, 
    error, 
    isLoading, 
    mutate 
  } = useSWR<User>('/api/current', fetcher);

  return {
    user: data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;