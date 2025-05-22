import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

interface Station {
  id: string;
  name: string;
  line: string;
  nextStation?: string;
  prevStation?: string;
  movieId?: string;
  description?: string;
}

const useStation = (stationId?: string) => {
  const { 
    data, 
    error, 
    isLoading,
    mutate 
  } = useSWR<Station>(
    stationId ? `/api/stations/${stationId}` : null,
    fetcher
  );

  return {
    station: data,
    error,
    isLoading,
    mutate,
    isNext: !!data?.nextStation,
    isPrev: !!data?.prevStation,
  };
};

export default useStation;