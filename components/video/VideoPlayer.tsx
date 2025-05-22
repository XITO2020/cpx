import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWatchRewards } from '@/hooks/useWatchRewards';
import { useSession } from 'next-auth/react';

interface VideoPlayerProps {
  movieId: string;
  videoUrl: string;
  thumbnailUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  movieId,
  videoUrl,
  thumbnailUrl
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data: session } = useSession();
  const { updateWatchTime } = useWatchRewards(movieId);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      updateWatchTime(video.currentTime, video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [movieId, updateWatchTime]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative aspect-video"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnailUrl}
        controls
        className="w-full h-full rounded-lg"
      />
      {session?.user?.isPremium && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 right-2 bg-yellow-500/80 text-black px-3 py-1 rounded-full text-sm font-bold"
        >
          Premium Rewards Active
        </motion.div>
      )}
    </motion.div>
  );
};