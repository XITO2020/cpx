import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BiSolidVolumeMute } from 'react-icons/bi';
import { AiOutlineInfoCircle, AiFillSound } from 'react-icons/ai';
import PlayButton from './PlayButton';
import { Movie } from '@/lib/types';
import useBillboardList from '@/hooks/useBillboardList';
import useInfoModal from '@/hooks/useInfoModal';

const getRandomMovie = (movies: Movie[]): Movie | undefined => {
  if (!movies.length) return undefined;
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};

const Billboard: React.FC = () => {
  const { data, error, isLoading } = useBillboardList();
  const { openModal } = useInfoModal();
  const [isClicked, setIsClicked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [movie, setMovie] = useState<Movie | undefined>();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (data) {
      setMovie(getRandomMovie(data));
    }
  }, [data]);

  const handleOpenModal = useCallback(() => {
    if (movie?.id) {
      openModal(String(movie.id));
    }
  }, [openModal, movie?.id]);

  useEffect(() => {
    const handleScroll = () => {
      const targetScroll = 1.8 * window.innerHeight;
      let scrollPercentage = window.scrollY / targetScroll;
      scrollPercentage = Math.min(1, Math.max(0, scrollPercentage));
      const newVolume = 1 - scrollPercentage;
      setVolume(newVolume);

      if (videoRef.current) {
        videoRef.current.volume = newVolume;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  const toggleMute = useCallback(() => {
    setIsMuted((prevMuted) => !prevMuted);
  }, []);

  if (isLoading) {
    return (
      <div className="text-white text-center mt-8 bg-emerald-950 w-full h-full">
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white text-center mt-8">
        Erreur lors du chargement des données.
      </div>
    );
  }

    return (
        <div className="relative h-[56.25vw] billboard">
             <video 
    ref={videoRef}
    autoPlay 
    muted 
    loop 
    poster={movie?.thumbnailUrl}
    src={movie?.videoUrl}
    className="billboardvideo border-b-zinc-700 border-b-4 w-full h-[56.25vw] object-cover brightness-[40%]"
>
</video>


             <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white 
                text-1xl
                md:text-5xl
                h-full
                w-[50%]
                lg:text-6xlfont-bold
                drop-shadow-xl
                text-opacity-40
                ">
                {movie?.title}    
                </p>
                <p className="text-white 
                text-1xl
                text-[8px]
                md:text-lg
                mt-3
                md:mt-8
                w-[90%]
                md:w-[80%]
                lg:w-[50%]
                drop-shadow-xl
                text-opacity-70">
                {movie?.description}    
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">

                    <PlayButton movieId={String(movie?.id)} />


                    <button onClick={handleOpenModal} 
                    className="bg-violet-600 text-white bg-opacity-30 rounded-md py-1 md:py-2
                    px-2 md:px-4 w-auto xs:text-md lg:text-lg dont-semibold flex flex-row items-center
                     hover:bg-rose-500 hover:bg-opacity-60 hover:text-neutral-300 transition">
                        <AiOutlineInfoCircle className="mr-1" />
                        Détails
                    </button>

                    <button
                    onClick={toggleMute}
                    className={`rounded-full p-2 text-2xl 
                    ${isClicked ? ' hover:text-black hover:bg-yellow-400' : 'hover:bg-pink-600 hover:text-white bg-neutral-600 text-rose-500'}`}
                    onMouseDown={() => setIsClicked(true)}
                    onMouseUp={() => setIsClicked(false)}
                    onMouseLeave={() => setIsClicked(false)}
                >
                    {isMuted?<BiSolidVolumeMute /> : <AiFillSound />}
                </button>


                    
                </div>
             </div>
        </div>
    )
}

export default Billboard;