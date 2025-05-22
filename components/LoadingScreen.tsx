import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <img
          src="/logo.png"
          alt="Loading..."
          className="w-24 h-24 object-contain"
        />
        <motion.div
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 text-rose-500 font-semibold"
        >
          Loading...
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;