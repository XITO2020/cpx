import React, { memo, useState } from 'react';
import { isEmpty } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';
import { SliderDesktop, SliderIpad, SliderIphone, SliderSamsung } from '../sliders';
import Exauster from './Exauster';
import { CustomSession, Movie } from '@/lib/types';
import useWindowSize from '@/hooks/useWindowSize';

interface MovieListProps {
  data: Movie[];
  session?: CustomSession;
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, session, title }) => {
  const windowSize = useWindowSize();
  const [isHovered, setIsHovered] = useState(false);

  if (isEmpty(data)) {
    return null;
  }

  const limitedData = Array.isArray(data) ? data.slice(0, 12) : [];

  const renderSlider = () => {
    if (!windowSize.width) return null;

    if (windowSize.width < 640) {
      return <SliderIphone data={limitedData} />;
    } else if (windowSize.width < 768) {
      return <SliderSamsung data={limitedData} />;
    } else if (windowSize.width < 1024) {
      return <SliderIpad data={limitedData} />;
    } else {
      return <SliderDesktop data={limitedData} />;
    }
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="movie-list px-4 py-8 pb-12 md:px-12 mt-4 space-y-8 relative 
                 overflow-visible hover:z-50 bg-transparent
                 hover:ring-offset-8 transition-all duration-300"
    >
      <motion.div 
        className="flex justify-between items-center"
        animate={{ 
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -5 : 0
        }}
      >
        <motion.p
          className="text-white text-md md:text-2xl lg:text-2xl font-semibold mb-4 
                     title-slide hover:bg-gradient-to-r from-violet-400 to-pink-300 
                     p-2 rounded-lg transition-colors"
        >
          {title}
        </motion.p>
        <Exauster 
          movieGenres={data && data.length > 0 ? data[0].movieGenres ?? [] : []} 
        />
      </motion.div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`relative ${isHovered ? 'z-50' : 'z-0'}`}
        >
          {renderSlider()}
        </motion.div>
      </AnimatePresence>

      {session?.user?.isPremium && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute top-2 right-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold"
        >
          Premium Rewards Available
        </motion.div>
      )}
    </motion.div>
  );
};

export default memo(MovieList);