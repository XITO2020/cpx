import { NextPageContext } from "next";
import { getSession, signOut } from 'next-auth/react';
import useFavorites, { UseFavoritesResponse } from '@/hooks/useFavorites';
import useInfoModal from '@/hooks/useInfoModal';
import InfoModal from '@/components/InfoModal';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from "@/hooks/useMovieList";
import { Movie, User } from '@/lib/types';  // Assurez-vous que le chemin est correct

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);
  if(!session) {
    return {
      redirect : {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList() as { data: Movie[] }; 
  const { data: favorites = [] }: UseFavoritesResponse = useFavorites();
  const { isOpen, closeModal } = useInfoModal(); 

  // Filtrer les films par genre "surprise"
  const motivationMovies = movies.filter(movie => movie.genre === "motivation");
  console.log("Movies in index.tsx:", movies);
   const index = 10;

  return (
    <>
    <div className="fond">
        <InfoModal visible={isOpen} onClose={closeModal} index={index} />
        <Navbar />
        <Billboard />
        {/* Si vous avez d'autres composants ou du contenu ici, ajoutez-les également. */}
    

        <div className="pb-40">
        <MovieList title="En ce moment..." data={motivationMovies} />
        <MovieList title="En ce moment..." data={motivationMovies} />
        <MovieList title="En ce moment..." data={motivationMovies} />
        <MovieList title="En ce moment..." data={motivationMovies} />
        <MovieList title="En ce moment..." data={motivationMovies} />
        <MovieList title="En ce moment..." data={motivationMovies} />
        <MovieList title="En ce moment..." data={motivationMovies} />
        <MovieList title="En ce moment..." data={motivationMovies} />
        <MovieList title="En ce moment..." data={motivationMovies} />

        </div>
      </div>
    </>
    )
}
