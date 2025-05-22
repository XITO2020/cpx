import useSWR from 'swr';
import { buildSearchQuery } from '@/lib/utils';

export const useAdvancedSearch = (params: any) => {
  const queryString = buildSearchQuery(params);
  
  const { data, error } = useSWR(
    queryString ? `/api/search/advanced?${queryString}` : null
  );

  return {
    results: data,
    isLoading: !error && !data,
    error
  };
};