import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { WATCH_REWARDS, WATCH_TIME_THRESHOLDS, PREMIUM_WATCH_INTERVAL } from '@/lib/constants';

export const useWatchRewards = (movieId: string) => {
  const { data: session } = useSession();
  const [watchTime, setWatchTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [watchCount, setWatchCount] = useState(0);

  useEffect(() => {
    const loadWatchCount = async () => {
      const response = await fetch('/api/user/watch-count');
      const data = await response.json();
      setWatchCount(data.count);
    };

    if (session?.user?.isPremium) {
      loadWatchCount();
    }
  }, [session]);

  const updateWatchTime = async (currentTime: number, videoDuration: number) => {
    if (!session?.user?.isPremium) return;

    setWatchTime(currentTime);
    setDuration(videoDuration);

    const watchedRatio = currentTime / videoDuration;

    if (watchedRatio >= WATCH_TIME_THRESHOLDS.SMALL && watchCount % PREMIUM_WATCH_INTERVAL === 0) {
      let rewardAmount = WATCH_REWARDS.SMALL;

      if (watchedRatio >= WATCH_TIME_THRESHOLDS.LARGE) {
        rewardAmount = WATCH_REWARDS.LARGE;
      } else if (watchedRatio >= WATCH_TIME_THRESHOLDS.MEDIUM) {
        rewardAmount = WATCH_REWARDS.MEDIUM;
      }

      try {
        await fetch('/api/rewards/watch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            movieId,
            watchedRatio,
            rewardAmount
          })
        });

        setWatchCount(prev => prev + 1);
      } catch (error) {
        console.error('Failed to process watch reward:', error);
      }
    }
  };

  return {
    updateWatchTime,
    watchTime,
    duration
  };
};