import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

interface Station {
  id: string;
  name: string;
  line: string;
  description?: string;
  connections?: string[];
  videoUrl?: string;
  thumbnailUrl?: string;
}

export const useStationInfo = (stationName: string) => {
  const { data, error, isLoading } = useSWR<Station>(
    stationName ? `/api/stations/${stationName}` : null,
    fetcher
  );

  return {
    station: data,
    error,
    isLoading,
  };
};