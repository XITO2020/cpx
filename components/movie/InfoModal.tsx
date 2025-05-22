import React, { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import PlayButton from './PlayButton';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';

interface InfoModalProps {
  visible?: boolean;
  onClose: () => void;
  index?: number;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose, index }) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const { movieId } = useInfoModal();
  const { data: movie } = useMovie(movieId);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  useEffect(() => {
    if (videoRef.current) {
      const { videoHeight, videoWidth } = videoRef.current;
      setIsOverflowing(videoWidth / videoHeight < 0.5625);
    }
  }, [movie?.videoUrl]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative mx-auto max-w-xl max-h-[66vh] rounded-md min-w-[32vw]"
        >
          <div className={`
            relative bg-zinc-900 rounded-md
            drop-shadow-md border-4 border-violet-600/40
            transform transition-transform duration-300
            ${isVisible ? 'scale-100' : 'scale-0'}
          `}>
            <div className={`relative ${isOverflowing ? 'w-1/2' : 'w-full'} h-96 mx-auto`}>
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                src={movie?.videoUrl}
                poster={movie?.thumbnailUrl}
                className="w-full h-full object-cover brightness-[60%]"
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    setIsOverflowing(
                      videoRef.current.videoWidth / videoRef.current.videoHeight < 0.5625
                    );
                  }
                }}
              />

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute top-3 right-3 h-10 w-10 rounded-full
                         bg-violet-600/70 flex items-center justify-center
                         border-2 border-rose-500 cursor-pointer"
              >
                <AiOutlineClose className="text-white" size={20} />
              </motion.button>

              <div className="absolute bottom-[10%] left-10 space-y-4">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-white text-3xl md:text-4xl lg:text-5xl font-bold"
                >
                  {movie?.title}
                </motion.h2>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <PlayButton movieId={movie?.id} />
                  <FavoriteButton movieId={movie?.id} index={index} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-20 left-64 h-52 w-80 
                           bg-zinc-700 rounded-lg border-2 border-red-500 
                           p-4 text-zinc-300 text-xl"
                >
                  <p>{movie?.description}</p>
                </motion.div>
              </div>
            </div>

            <div className="px-12 py-4 space-y-2">
              <p className="text-green-400 font-semibold text-lg">New</p>
              <p className="text-white text-lg">{movie?.duration}</p>
              <p className="text-white text-lg">{movie?.genre}</p>
              <p className="text-white text-lg">{movie?.rating}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InfoModal;