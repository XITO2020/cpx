```typescript
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Movie } from '@/lib/types';

const useRandomVideo = () => {
  const { data: video, error } = useSWR<Movie>(
    '/api/movies/random',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    randomVideo: video,
    isLoading: !error && !video,
    error
  };
};

export default useRandomVideo;
```