import prismadb from '@/lib/prismadb';
import React, { lazy, Suspense, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { authOptions } from './api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import useFavorites from '@/hooks/useFavorites';
import useInfoModal from '@/hooks/useInfoModal';
import InfoModal from '@/components/InfoModal';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from "@/hooks/useMovieList";
import { Movie, CustomSession } from '@/lib/types';
import GridThumbnails from '@/components/GridThumbnails';

const LazyMovieList = lazy(() => import('@/components/MovieList'));

type Props = {
  session: CustomSession | null;
  movies: Movie[] | null;
  moviesByGenre: { [key: string]: Movie[] };
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return {
      props: {
        session: null,
        movies: null,
        moviesByGenre: {},
      },
    };
  }

  const user = await prismadb.user.findUnique({
    where: { email: session.user.email },
  });

  const movies = await prismadb.movie.findMany();

  const moviesByGenre = movies.reduce((acc: { [key: string]: Movie[] }, movie: Movie) => {
    if (!acc[movie.genre]) {
      acc[movie.genre] = [];
    }
    acc[movie.genre].push(movie);
    return acc;
  }, {});

  // Exclure la propriété `emailVerified` de l'objet `session.user`
  const { emailVerified, ...userWithoutEmailVerified } = session.user;

  return {
    props: {
      session: { ...session, user: userWithoutEmailVerified } as CustomSession,
      movies,
      moviesByGenre,
    },
  };
};

const HomePage: React.FC<Props> = ({ session, movies, moviesByGenre }) => {
  const { data: movieList = movies || [] } = useMovieList() as { data: Movie[] };
  const favorites = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadedMovieLists, setLoadedMovieLists] = useState<Movie[]>([]);

  const loadMore = () => {
    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newMovieLists = movies?.slice(startIndex, endIndex) || [];
    setLoadedMovieLists([...loadedMovieLists, ...newMovieLists]);
    if (!movies || endIndex >= movies.length || 0) {
      setHasMore(false);
    } else {
      setPage(page + 1);
    }
  };

  const alertMovies = moviesByGenre["alert-launchers"] || [];
  const nasaMovies = moviesByGenre["nasa"] || [];
  const hightechMovies = movies?.filter(movie => movie.genre === "50-5G&tech") || [];
  const grapheneMovies = movies?.filter(movie => movie.genre === "oxydedegraphene") || [];
  const surviveMovies = movies?.filter(movie => movie.genre === "46-survivalisme") || [];
  const mediacontrolMovies = movies?.filter(movie => movie.genre === "mediacontrol") || [];
  const oppMovies = movies?.filter(movie => movie.genre === "opposition-controlee") || [];
  const hiddenMovies = movies?.filter(movie => movie.genre === "60-hidden-history-policy-truth") || [];
  const hiddenprojectsnowMovies = movies?.filter(movie => movie.genre === "61-hidden-projects-now") || [];
  const poisonMovies = movies?.filter(movie => movie.genre === "48-empoisonnement-ecology-pollution");
  const wordsMovies = movies?.filter(movie => movie.genre === "2-etyomologie") || [];
  const medecineMovies = movies?.filter(movie => movie.genre === "45-medecine") || [];
  const foodhealthMovies = movies?.filter(movie => movie.genre === "47-food&health") || [];
  const frequenciesMovies = movies?.filter(movie => movie.genre === "49-body&mind-dna-frequencies") || [];
  const chemtrailsMovies = movies?.filter(movie => movie.genre === "51-chemtrails&haarp-seisme-bluebbeam") || [];
  const HHMovies = movies?.filter(movie => movie.genre === "59-historical-hoaxes-till-climatechange") || [];
  const afrikaMovies = movies?.filter(movie => movie.genre === "70-africa-korps") || [];
  const beingMovies = movies?.filter(movie => movie.genre === "77-being-complotist") || [];
  const wakeupMovies = movies?.filter(movie => movie.genre === "78-wake-up") || [];
  const bbMovies = movies?.filter(movie => movie.genre === "58-bluebeam-evolution") || [];
  const canbetrueMovies = movies?.filter(movie => movie.genre === "62-canbetrue") || [];
  const concordismMovies = movies?.filter(movie => movie.genre === "63-concodrisme") || [];
  const embrouilleursMovies = movies?.filter(movie => movie.genre === "64-embrouilleurs-volontaires-or-50%good") || [];
  const strangerthingsMovies = movies?.filter(movie => movie.genre === "strangerthings") || [];
  const oligMovies = movies?.filter(movie => movie.genre === "oligarchie") || [];
  const hydraMovies = movies?.filter(movie => movie.genre === "banks&hydra") || [];
  const fmMovies = movies?.filter(movie => movie.genre === "FM+MK") || [];
  const realityMovies = movies?.filter(movie => movie.genre === "realityis") || [];
  const idiotsMovies = movies?.filter(movie => movie.genre === "usefull idiots & agents smith") || [];

  console.log('Alert Movies:', beingMovies); // Ajoutez ce log pour vérifier les films
  console.log('Nasa Movies:', nasaMovies); // Ajoutez ce log pour vérifier les films

  return (
    <>
      <div className="fond">
        <Navbar session={session} />
        <Billboard />
        {!session && <GridThumbnails /> }
      <div>
          <InfiniteScroll className="fond-infinite"
            dataLength={loadedMovieLists.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<div>Loading...</div>}
          >
            <MovieList title="Chemtrails" data={chemtrailsMovies} />
            <MovieList title="Being a conspiracy theorist" data={beingMovies} />
            <MovieList title="BlueBeam evolution" data={bbMovies} />
            <MovieList title="Nasa" data={nasaMovies} />
            <MovieList title="Media Cons d'Troll" data={mediacontrolMovies} />
            <MovieList title="Survivalisme" data={surviveMovies} />
            <MovieList title="Lanceurs d'alerte" data={alertMovies} />
            <MovieList title="5G and dangerous High Tech" data={hightechMovies} />
            <MovieList title="Waking up" data={wakeupMovies} />
            <MovieList title="Projects cachés jusque maintenant" data={hiddenMovies} />
            <MovieList title="Oxyde de Graphène" data={grapheneMovies} />
            <MovieList title="Afrika CORP" data={afrikaMovies} />
            <MovieList title="Projects cachés jusque maintenant" data={hiddenprojectsnowMovies} />
            <MovieList title="Hoaxes dans l'Histoire jusqu'au mytho climatique" data={HHMovies} />

            {loadedMovieLists.map((movie, index) => (
              <Suspense key={movie.id} fallback={<div>Loading MovieList...</div>}>
                <LazyMovieList title={movie.title} data={[movie]} session={session || undefined} />
              </Suspense>
            ))}
          </InfiniteScroll>
        </div>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-50" onClick={closeModal} />
      )}

      <div className={`fixed top-0 left-0 w-full h-full z-50 ${isOpen ? '' : 'pointer-events-none'}`}>
        <InfoModal visible={isOpen} onClose={closeModal} />
      </div>
    </>
  )
}

export default HomePage;
