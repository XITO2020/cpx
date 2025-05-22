import React from 'react';
import { useRouter } from 'next/router';
import { BsFillPlayFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(`/watch/${movieId}`)}
      className="bg-neutral-600 text-rose-500 rounded-md py-1 md:py-2 
                 px-2 md:px-4 w-auto text-xs lg:text-lg font-bold 
                 flex items-center hover:text-black hover:bg-neutral-300 
                 transition-all duration-300 group"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="mr-1"
      >
        <BsFillPlayFill size={25} />
      </motion.div>
      <span className="group-hover:tracking-wider transition-all duration-300">
        Play
      </span>
    </motion.button>
  );
};

export default PlayButton;