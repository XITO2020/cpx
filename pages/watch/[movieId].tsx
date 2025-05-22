import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import ReactPlayer from 'react-player';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import useMovie from '@/hooks/useMovie';
import { LinkedArticle, CustomSession, Movie } from '@/lib/types';
import { useSessionContext } from '@/contexts/sessionContext';
import Search from '@/components/Search';
import Comments from '@/components/Comments';
import Blog from '@/components/blog/blog';
import prismadb from '@/lib/prismadb';

interface WatchProps {
  session: CustomSession | null;
  movies: Movie[];
  articles: LinkedArticle[];
}

const Watch: React.FC<WatchProps> = ({ session, movies, articles }) => {
  const router = useRouter();
  const [currentMovieId, setCurrentMovieId] = useState<string>();
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const { data: movie, error, isLoading } = useMovie(currentMovieId);

  useEffect(() => {
    if (router.isReady && router.query.movieId) {
      setCurrentMovieId(router.query.movieId as string);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (movies?.length && currentMovieId) {
      const currentMovie = movies.find(m => m.id === currentMovieId);
      if (currentMovie) {
        const sameCategoryMovies = movies.filter(m => m.movieGenres === currentMovie.movieGenres);
        setFilteredMovies(sameCategoryMovies);
        setCurrentMovieIndex(sameCategoryMovies.findIndex(m => m.id === currentMovieId));
      }
    }
  }, [movies, currentMovieId]);

  const handleNextMovie = () => {
    if (filteredMovies.length > 0) {
      const nextIndex = (currentMovieIndex + 1) % filteredMovies.length;
      const nextMovie = filteredMovies[nextIndex];
      setCurrentMovieIndex(nextIndex);
      setCurrentMovieId(nextMovie.id);
      router.push(`/watch/${nextMovie.id}`, undefined, { shallow: true });
    }
  };

  if (!session) {
    router.push('/auth');
    return null;
  }

  return (
    <div className="bg-black min-h-screen">
      <nav className="fixed w-full p-4 z-10 flex items-center gap-8 bg-black bg-opacity-70 justify-between mb-20">
        <div className="flex flex-row items-center gap-4">
          <AiOutlineArrowLeft 
            className="text-white cursor-pointer hover:text-violet-400 transition" 
            size={40}
            onClick={() => router.push('/')}
          />
          <p className="font-bold text-white text-1xl md:text-3xl font-bebas">
            <span className="text-rose-500 font-light subway">Watching:</span> 
            {movie?.title}
          </p>
          <AiOutlineArrowRight 
            className="text-white cursor-pointer hover:text-rose-500 transition" 
            size={40} 
            onClick={handleNextMovie} 
          />
        </div>
        <Search />
      </nav>

      <main className="video-grid mt-20 p-4">
        <div className="video-player mt-20">
          {isLoading && <p className="text-white font-evogria text-3xl">Loading...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {movie?.videoUrl && (
            <ReactPlayer
              className="w-full h-full"
              url={`/${movie.videoUrl}`}
              controls
              width="100%"
              height="100%"
              onError={(e) => console.error("Video playback error:", e)}
            />
          )}
        </div>

        <div className="sidebar-grid grid gap-4">
          <div className="sidebar-item bg-fuchsia-400 bg-opacity-30 hover:bg-opacity-100 transition p-4 rounded">
            <h3 className="text-white font-bold mb-2">Settings</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-white bg-opacity-20 p-2 rounded hover:bg-opacity-30">Cinema Mode</button>
              <button className="bg-white bg-opacity-20 p-2 rounded hover:bg-opacity-30">Mobile View</button>
              <button className="bg-white bg-opacity-20 p-2 rounded hover:bg-opacity-30">Sound</button>
              <button className="bg-white bg-opacity-20 p-2 rounded hover:bg-opacity-30">Subtitles</button>
            </div>
          </div>

          <div className="sidebar-item bg-yellow-400 bg-opacity-30 hover:bg-opacity-100 transition p-4 rounded">
            <h3 className="text-white font-bold mb-2">Rating</h3>
            <div className="text-white">★★★★★</div>
            <p className="text-white mt-2">Overall: 10/10</p>
          </div>

          <div className="sidebar-item bg-violet-800 bg-opacity-30 hover:bg-opacity-100 transition p-4 rounded">
            <Comments movieId={currentMovieId || ""} />
          </div>

          <div className="sidebar-item bg-rose-600 bg-opacity-30 hover:bg-opacity-100 transition p-4 rounded">
            <h3 className="text-white font-bold mb-2">Premium Features</h3>
            <p className="text-white">Unlock more content</p>
          </div>
        </div>
      </main>

      <section className="mt-8">
        <Blog 
          movie={movie} 
          movies={movies} 
          article={articles?.[0]} 
          articles={articles} 
          session={session} 
          page="movieId" 
        />
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<WatchProps> = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    };
  }

  try {
    const [movies, articles] = await Promise.all([
      prismadb.movie.findMany(),
      prismadb.linkedArticle.findMany()
    ]);

    return {
      props: {
        session,
        movies: movies || [],
        articles: articles || [],
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        session,
        movies: [],
        articles: [],
      }
    };
  }
};

export default Watch;