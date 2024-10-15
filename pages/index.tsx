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

interface MoviesByGenre {
  [key: string]: Movie[];
}

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

  const movies = await prismadb.movie.findMany({
    include: {
      movieGenres: {
        include: {
          genre: {
            select: {
              id: true,
              name: true,
            }, 
          },
        },
      },
    },
  });
  console.log('Données de films récupérées de la base de données :', movies);
  

  const moviesByGenre = movies.reduce((acc: { [key: string]: Movie[] }, movie: Movie) => {
    if (movie.movieGenres) {
      movie.movieGenres.forEach((movieGenre) => {
        const genre = movieGenre.genre;
        if (!acc[genre.name]) {
          acc[genre.name] = [];
        }
        acc[genre.name].push(movie);
      });
    }
    return acc;
  }, {});  

  // Exclure la propriété `emailVerified` de l'objet `session.user`
  const { emailVerified, ...userWithoutEmailVerified} = session.user;

  return {
    props: {
      session: { ...session, user: userWithoutEmailVerified } as CustomSession,
      movies,
      moviesByGenre,
    },
  };
};

const HomePage: React.FC<Props> = ({ session, movies = [], moviesByGenre = {} }) => {
  const { data: movieList = movies ? movies : [] } = useMovieList() as { data: Movie[] };
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

  const alertMovies = movies ? movies.filter(movie =>
    movie.movieGenres && movie.movieGenres.some(movieGenre => movieGenre.genre && movieGenre.genre.name === "alert-launchers")
  ) : [];
  const genres = [
    "nasa",
    "50-5G&tech",
    "oxydedegraphene",
    "46-survivalisme",
    "mediacontrol",
    "opposition-controlee",
    "60-hidden-history-policy-truth",
    "61-hidden-projects-now",
    "48-empoisonnement-ecology-pollution",
    "2-etyomologie",
    "45-medecine",
    "47-food&health",
    "49-body&mind-dna-frequencies",
    "51-chemtrails&haarp-seisme-bluebbeam",
    "59-historical-hoaxes-till-climatechange",
    "70-africa-korps",
    "77-being-complotist",
    "78-wake-up",
    "58-bluebeam-evolution",
    "62-canbetrue",
    "63-concodrisme",
    "64-embrouilleurs-volontaires-or-50%good",
    "strangerthings",
    "oligarchie",
    "banks&hydra",
    "FM+MK",
    "realityis",
    "usefull idiots & agents smith"
  ];
  const chemtrailsMovies = movies ? movies.filter(movie =>
    movie.movieGenres && movie.movieGenres.some(movieGenre => movieGenre.genre && movieGenre.genre.name === "51-chemtrails&haarp-seisme-bluebbeam")
  ): [];
  console.log('Données de films filtrées pour la catégorie "Chemtrails" :', chemtrailsMovies);
  
  
  const moviesByGenreMap = genres.reduce((acc : { [key: string]: Movie[] }, genre) => {
    acc[genre] = moviesByGenre[genre] || [];
    return acc;
  }, {});
  
  const {
    nasaMovies,
    hightechMovies,
    grapheneMovies,
    surviveMovies,
    mediacontrolMovies,
    oppMovies,
    hiddenMovies,
    hiddenprojectsnowMovies,
    poisonMovies,
    wordsMovies,
    medecineMovies,
    foodhealthMovies,
    frequenciesMovies,
    HHMovies,
    afrikaMovies,
    beingMovies,
    wakeupMovies,
    bbMovies,
    canbetrueMovies,
    concordismMovies,
    embrouilleursMovies,
    strangerthingsMovies,
    oligMovies,
    hydraMovies,
    fmMovies,
    realityMovies,
    idiotsMovies
  } = moviesByGenreMap;
  
  // const nasaMovies = moviesByGenre["nasa"] || [];
  // const hightechMovies = moviesByGenre["50-5G&tech"] || [];
  // const grapheneMovies = moviesByGenre["oxydedegraphene"] || [];
  // const surviveMovies = moviesByGenre["46-survivalisme"] || [];
  // const mediacontrolMovies = moviesByGenre["mediacontrol"] || [];
  // const oppMovies = moviesByGenre["opposition-controlee"] || [];
  // const hiddenMovies = moviesByGenre["60-hidden-history-policy-truth"] || [];
  // const hiddenprojectsnowMovies = moviesByGenre["61-hidden-projects-now"] || [];
  // const poisonMovies = moviesByGenre["48-empoisonnement-ecology-pollution"] || [];
  // const wordsMovies = moviesByGenre["2-etyomologie"] || [];
  // const medecineMovies = moviesByGenre["45-medecine"] || [];
  // const foodhealthMovies = moviesByGenre["47-food&health"] || [];
  // const frequenciesMovies = moviesByGenre["49-body&mind-dna-frequencies"] || [];
  // const chemtrailsMovies = moviesByGenre["51-chemtrails&haarp-seisme-bluebbeam"] || [];
  // const HHMovies = moviesByGenre["59-historical-hoaxes-till-climatechange"] || [];
  // const afrikaMovies = moviesByGenre["70-africa-korps"] || [];
  // const beingMovies = moviesByGenre["77-being-complotist"] || [];
  // const wakeupMovies = moviesByGenre["78-wake-up"] || [];
  // const bbMovies = moviesByGenre["58-bluebeam-evolution"] || [];
  // const canbetrueMovies = moviesByGenre["62-canbetrue"] || [];
  // const concordismMovies = moviesByGenre["63-concodrisme"] || [];
  // const embrouilleursMovies = moviesByGenre["64-embrouilleurs-volontaires-or-50%good"] || [];
  // const strangerthingsMovies = moviesByGenre["strangerthings"] || [];
  // const oligMovies = moviesByGenre["oligarchie"] || [];
  // const hydraMovies = moviesByGenre["banks&hydra"] || [];
  // const fmMovies = moviesByGenre["FM+MK"] || [];
  // const realityMovies = moviesByGenre["realityis"] || [];
  // const idiotsMovies = moviesByGenre["usefull idiots & agents smith"] || [];

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
<MovieList title="Chemtrails" data={moviesByGenre["51-chemtrails&haarp-seisme-bluebbeam"] || []} />
<MovieList title="Being a conspiracy theorist" data={moviesByGenre["77-being-complotist"] || []} />
<MovieList title="BlueBeam evolution" data={moviesByGenre["58-bluebeam-evolution"] || []} />
<MovieList title="Nasa" data={moviesByGenre["nasa"] || []} />
<MovieList title="Media Cons d'Troll" data={moviesByGenre["mediacontrol"] || []} />
<MovieList title="Survivalisme" data={moviesByGenre["46-survivalisme"] || []} />
<MovieList title="Lanceurs d'alerte" data={moviesByGenre["alert-launchers"] || []} />
<MovieList title="5G and dangerous High Tech" data={moviesByGenre["50-5G&tech"] || []} />
<MovieList title="Waking up" data={moviesByGenre["78-wake-up"] || []} />
<MovieList title="Projects cachés jusque maintenant" data={moviesByGenre["60-hidden-history-policy-truth"] || []} />
<MovieList title="Oxyde de Graphène" data={moviesByGenre["oxydedegraphene"] || []} />
<MovieList title="Afrika CORP" data={moviesByGenre["70-africa-korps"] || []} />
<MovieList title="Projects cachés jusque maintenant" data={moviesByGenre["61-hidden-projects-now"] || []} />
<MovieList title="Hoaxes dans l'Histoire jusqu'au mytho climatique" data={moviesByGenre["59-historical-hoaxes-till-climatechange"] || []} />


            {Object.keys(moviesByGenre).map((genre) => (
              ![
                "alert-launchers",
                "nasa",
                "50-5G&tech",
                "oxydedegraphene",
                "46-survivalisme",
                "mediacontrol",
                "opposition-controlee",
                "60-hidden-history-policy-truth",
                "61-hidden-projects-now",
                "48-empoisonnement-ecology-pollution",
                "2-etyomologie",
                "45-medecine",
                "47-food&health",
                "49-body&mind-dna-frequencies",
                "51-chemtrails&haarp-seisme-bluebbeam",
                "59-historical-hoaxes-till-climatechange",
                "70-africa-korps",
                "77-being-complotist",
                "78-wake-up",
                "58-bluebeam-evolution",
                "62-canbetrue",
                "63-concodrisme",
                "64-embrouilleurs-volontaires-or-50%good",
                "strangerthings",
                "oligarchie",
                "banks&hydra",
                "FM+MK",
                "realityis",
                "usefull idiots & agents smith",
              ].includes(genre) && (
                <MovieList key={genre} title={genre} data={moviesByGenre[genre]} />
              )
            ))}

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
  );
};

export default HomePage;
