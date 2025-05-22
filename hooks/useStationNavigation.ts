import { useCallback } from 'react';
import { useRouter } from 'next/router';
import useStation from './useStation';

const useStationNavigation = (currentStationId?: string) => {
  const router = useRouter();
  const { station, isLoading } = useStation(currentStationId);

  const navigateToNextStation = useCallback(() => {
    if (station?.nextStation) {
      router.push(`/station/${station.nextStation}`);
    }
  }, [router, station]);

  const navigateToPrevStation = useCallback(() => {
    if (station?.prevStation) {
      router.push(`/station/${station.prevStation}`);
    }
  }, [router, station]);

  return {
    navigateToNextStation,
    navigateToPrevStation,
    canNavigateNext: !!station?.nextStation,
    canNavigatePrev: !!station?.prevStation,
    isLoading,
  };
};

export default useStationNavigation;