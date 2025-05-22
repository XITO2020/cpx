import React from 'react';
import { motion } from 'framer-motion';

interface JackpotReelProps {
  images: Array<{ id: number; src: string; reward: number }>;
  isSpinning: boolean;
  delay: number;
  duration: number;
  result: number;
}

export const JackpotReel: React.FC<JackpotReelProps> = ({
  images,
  isSpinning,
  delay,
  duration,
  result,
}) => {
  const variants = {
    spinning: {
      y: [0, -1000],
      transition: {
        y: {
          duration: duration / 1000,
          ease: "easeInOut",
          delay: delay / 1000,
          repeat: Infinity,
        }
      }
    },
    stopped: {
      y: -result * 100,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: delay / 1000,
      }
    }
  };

  return (
    <div className="w-32 h-32 bg-zinc-800 rounded-lg overflow-hidden relative">
      <motion.div
        className="absolute inset-0"
        animate={isSpinning ? "spinning" : "stopped"}
        variants={variants}
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="w-32 h-32 flex items-center justify-center"
          >
            <img
              src={image.src}
              alt={`Symbol ${image.id}`}
              className="w-24 h-24 object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};