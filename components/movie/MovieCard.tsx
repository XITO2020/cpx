import React, { memo } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Movie } from '@/lib/types';

interface MovieCardProps {
  data: Movie;
  index: number;
}

const MovieCard: React.FC<MovieCardProps> = memo(({ data, index }) => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const { openModal } = useInfoModal();

  const movieYear = data?.year ? parseInt(data.year) : null;
  const { displayText, displayColor } = getYearDisplay(movieYear);

  const handlePlayClick = () => {
    router.push(`/watch/${data?.id}`);
  };

  const handleInfoClick = () => {
    openModal(data?.id);
  };

  const getBackgroundColor = (index: number) => {
    const colors = [
      'bg-yellow-300',
      'bg-emerald-800',
      'bg-violet-800',
      'bg-pink-500',
      'bg-fuchsia-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="movie-card group relative"
    >
      {/* Base Card */}
      <div className="relative w-full h-[16vw] rounded-lg overflow-hidden filmroll border-2 border-opacity-40 hover:border-rose-600">
        <img
          src={data.thumbnailUrl}
          alt={data.title}
          className="w-full h-full object-cover transition duration-300 group-hover:opacity-90"
        />
      </div>

      {/* Hover Content */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-4 left-5 w-full z-10 invisible sm:visible"
        >
          <motion.div
            className="relative w-full"
            layoutId={`movie-${data.id}`}
          >
            <img
              src={data.thumbnailUrl}
              alt={data.title}
              className="w-full aspect-video object-cover rounded-t-md"
            />

            <motion.div
              className="absolute bottom-0 w-full bg-zinc-900 p-4 rounded-b-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {/* Controls */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayClick}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getBackgroundColor(index)} hover:opacity-80`}
                >
                  <BsFillPlayFill size={30} />
                </motion.button>

                <FavoriteButton movieId={data.id} index={index} />

                <p className="text-neutral-400 font-medium truncate flex-1">
                  {data.title}
                </p>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleInfoClick}
                  className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-white/60"
                >
                  <BiChevronDown className="text-white text-2xl" />
                </motion.button>
              </div>

              {/* Movie Info */}
              <div className="mt-4 space-y-3">
                <p className={`font-semibold ${displayColor}`}>
                  {displayText}
                  <span className="text-white ml-1">{movieYear}</span>
                </p>

                <div className="flex items-center justify-between text-sm">
                  <p className="text-white">{data.duration}</p>
                  <div className="flex gap-4">
                    <p className="text-purple-400">
                      {data.views} <span className="text-white">views</span>
                    </p>
                    <p className="text-rose-400">
                      {data.rating} <span className="text-white">/10</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

function getYearDisplay(year: number | null) {
  if (!year) {
    return {
      displayText: "",
      displayColor: "text-gray-400"
    };
  }

  if (year === 2023 || year === 2024) {
    return {
      displayText: "New",
      displayColor: "text-green-400"
    };
  }

  if (year < 2023) {
    return {
      displayText: "Year:",
      displayColor: "text-gray-400"
    };
  }

  return {
    displayText: "Out timed",
    displayColor: "text-red-500"
  };
}

MovieCard.displayName = 'MovieCard';

export default MovieCard;