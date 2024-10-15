import React, { useEffect, useState } from 'react';
import useMovie from '@/hooks/useMovie';
import { LinkedArticle, CustomSession, Movie } from '@/lib/types';
import { useRouter } from 'next/router';
import { useSessionContext } from '@/contexts/sessionContext';
import ReactPlayer from 'react-player';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Search from '@/components/Search';
import Comments from '@/components/Comments'
import Blog from '@/components/blog/blog';
import { getSession } from 'next-auth/react';
import prismadb from '@/lib/prismadb';

interface WatchProps {
    session: CustomSession | null;
    movies: Movie[] | null;
    articles: LinkedArticle[] | null;
}

const Watch: React.FC<WatchProps> = ({ session, movies, articles }) => {
    const router = useRouter();
    const [currentMovieId, setCurrentMovieId] = useState<string | undefined>();
    const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

    useEffect(() => {
        if (router.isReady && router.query.movieId) {
            setCurrentMovieId(router.query.movieId as string);
        }
    }, [router.isReady, router.query]);

    useEffect(() => {
        if (movies && currentMovieId) {
            const currentMovie = movies.find(movie => movie.id === currentMovieId);
            if (currentMovie) {
                const sameCategoryMovies = movies.filter(movie => movie.movieGenres === currentMovie.movieGenres);
                setFilteredMovies(sameCategoryMovies);
                setCurrentMovieIndex(sameCategoryMovies.findIndex(movie => movie.id === currentMovieId));
            }
        }
    }, [movies, currentMovieId]);

    const { data, error, isLoading } = useMovie(currentMovieId);

    const handleNextMovie = () => {
        if (filteredMovies.length > 0) {
            const nextIndex = (currentMovieIndex + 1) % filteredMovies.length;
            setCurrentMovieIndex(nextIndex);
            setCurrentMovieId(filteredMovies[nextIndex].id);
            router.push(`/watch/${filteredMovies[nextIndex].id}`, undefined, { shallow: true });
        }
    };

    return (
        <div className="bg-black">
            <nav className="fixed w-full p-4 z-10 flex items-center gap-8 bg-black bg-opacity-70 justify-between mb-20">
                <div className="flex flex-row items-center">
                    <AiOutlineArrowLeft className="text-white cursor-pointer hover:text-violet-400" size={40}
                    onClick={() => { router.push('/') }}
                    />

                    <p className="font-bold text-white text-1xl md:text-3xl font-bebas">
                        <span className="text-rose-500 font-light subway">
                            Watching:
                        </span> {data?.title}
                    </p>

                    <AiOutlineArrowRight className="text-white cursor-pointer hover:text-rose-500" size={40} onClick={handleNextMovie} />
                    
                </div>

                <Search />
            </nav>

            <main className="video-grid mt-20">

            <div className="video-player mt-20">
                {isLoading && <p className="text-white font-evogria text-3xl">Chargement...</p>}
                {error && <p>Erreur lors du chargement : {JSON.stringify(error)}</p>}
                {data?.videoUrl && (
                    <>
                    <ReactPlayer
                        className="w-full h-full text-fuchsia-400 font-evogria text-3xl"
                        url={`/${data.videoUrl}`}
                        controls
                        onError={(error) => console.error("Erreur lors de la lecture de la vidéo :", error)}
                    />
                    </>
                )}
            </div>

                <div className="sidebar-item agencing opacity-30 hover:opacity-100 bg-fuchsia-400">
                    agencing
                    <div className="grid grid-cols-2 grid-rows-2">
                        <button>cinema</button>
                        <button>telephone</button>
                        <button>sound</button>
                        <button>subtitles</button>
                    </div>

                </div>
                <div className="sidebar-item rating opacity-30 hover:opacity-100 bg-yellow-400">
                    rating
                    * * * * * Stars
                    <p>note global : 10/10</p>
                </div>
                <div className="sidebar-item addcomment opacity-30 hover:opacity-100 bg-violet-800">
                <div className="comments">
                            <Comments movieId ={currentMovieId || ""} />
                        </div>
                </div>
                <div className="sidebar-item randomize opacity-30 hover:opacity-100 bg-rose-600">
                    randomize
                        +
                    bonus premium
                </div>

            </main>

            <section>
            <Blog movie={data} movies={movies} article={articles ? articles[0] : undefined} articles={articles} session={session} page="movieId" />

            </section>

        </div>
    )
}

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        },
      };
    }

    const movies = await prismadb.movie.findMany();
    const articles = await prismadb.linkedArticle.findMany() || [];

    return {
      props: {
        session,
        movies,
        articles,
      },
    };
  };

export default Watch;
