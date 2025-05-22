import useSWR from 'swr';
import { StationQuiz } from '@/lib/types';
import fetcher from '@/lib/fetcher';

export const useStationQuiz = (stationId: string) => {
  const { data, error, mutate } = useSWR<StationQuiz>(
    `/api/subway/stations/${stationId}/quiz`,
    fetcher
  );

  const submitQuiz = async (answers: number[]) => {
    try {
      const response = await fetch(
        `/api/subway/stations/${stationId}/quiz/submit`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers })
        }
      );

      if (!response.ok) throw new Error('Failed to submit quiz');

      const result = await response.json();
      mutate();
      return result;
    } catch (error) {
      console.error('Quiz submission error:', error);
      throw error;
    }
  };

  return {
    quiz: data,
    isLoading: !error && !data,
    error,
    submitQuiz
  };
};