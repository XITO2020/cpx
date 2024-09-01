import { GetServerSideProps, NextPageContext } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from "next/navigation";
import Link from "next/link";
import useCurrentUser from "@/hooks/useCurrentUser";
import Subway from "@/components/Subway"; // Importer le composant Subway
import { CustomSession, Movie } from "@/lib/types";
import { authOptions } from './api/auth/[...nextauth]';
import prismadb from '@/lib/prismadb'; //
import Search from '@/components/Search';
import Favorites from '@/components/Favorites';

type ProfileProps = {
  session: CustomSession | null;
  movies: Movie[] | null;
};

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log("SESSION", session);

  if (!session || !session.user || !session.user.email) {
    return {
      props: {
        session: null,
        movies: null,
      },
    };
  }

  const user = await prismadb.user.findUnique({
    where: { email: session.user.email },
    include: {
      favoriteMovies: true,
    },
  });

  const movies = user?.favoriteMovies || [];

  return {
    props: {
      session,
      movies,
    },
  };
};

const Profiles = ({ session, movies }: ProfileProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Votre terrier personnel</h1>
        <div className="mt-8 text-gray-400 flex justify-between
                          text-2xl text-center w-[560px] mx-auto 
                          group-hover:text-white capitalize">
                {session?.user?.name}
                <Search />
              </div>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => { router.push('/') }}>
            <div className="group flex-row w-44 mx-auto relative">
              <div className="w-44 h-44 rounded-md
                          flex items-center justify-center
                          border-4 border-transparent
                          group-hover:cursor-pointer
                          group-hover:border-yellow-400
                          overflow-hidden hover:ease-in duration-300">
                {!session?.user || !session?.user?.image ? (<img src="/img/mickaelbroughtsome.png" alt="avatar test" />)
                  : (<img src={session?.user?.image} alt="image test" />)}
              </div>
              
              <div className="absolute bottom-0 left-0 w-full text-center text-yellow-400 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                Accès aux films
              </div>
            </div>
          </div>
          <div onClick={() => { router.push('/admin/dashboard') }}>
            <div className="group flex-row w-44 mx-auto relative">
              <div className="w-44 h-44 rounded-md
                          flex items-center justify-center
                          border-4 border-transparent
                          group-hover:cursor-pointer
                          group-hover:border-violet-600
                          overflow-hidden hover:ease-in duration-300">
                {!session?.user || !session?.user?.image ? (<img src="/img/avatars-kings.png" alt="avatar test" />)
                  : (<img src={session?.user?.image} alt="image test" />)}
              </div>
              
              <div className="absolute bottom-0 left-0 w-full text-center text-violet-600 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                Votre Dashboard
              </div>
            </div>
          </div>
          <div onClick={() => { router.push('/') }}>
            <div className="group flex-row w-44 mx-auto relative">
              <div className="w-44 h-44 rounded-md
                          flex items-center justify-center
                          border-4 border-transparent
                          group-hover:cursor-pointer
                          group-hover:border-pink-500
                          overflow-hidden hover:ease-in duration-300">
                <img src="/img/future404.png" alt="the future 404 radio game" />    
              </div>
              
              <div className="absolute bottom-0 left-0 w-full text-center text-pink-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                Jeu à venir
              </div>
            </div>
          </div>
        </div>

         {/* Affichage des films favoris */}
         <div className="mt-10 text-center mb-16">
          <h2 className="text-2xl text-white">Vos films favoris</h2>
          {movies && movies.length > 0 ? (
            <Favorites movies={movies} />
          ) : (
            <h2 className="text-lg text-yellow-400">(Vous n'avez pas encore de films préférés enregistrés)</h2>
          )}
        </div>


        {/* Condition pour vérifier si l'utilisateur est premium ou non */}
        {session?.user?.isPremium === false ? (
          <div className="mt-12 subway-container">
            <h3 className="text-center text-2xl text-white font-earl tracking-widest">Entrez dans le subway, vous avez l'accès spécial</h3>
            <Subway />
          </div>
        ) : (
          <Link href="/premium">
            <div className="mt-10 text-white text-xl gotopremiumsub
                        bg-zinc-950 hover:border-transparent drop-shadow shadow-rose-500">
              <div className="flex flex-col items-center justify-center gap-y-8">
                <h3>Financez le subway, abonnez-vous !</h3>
                <p> Le subway est un metro interactif</p>
                <p> The aknowledgement tunnels toward another world !</p>
              </div>
            </div>
          </Link>
        )}
        
      </div>
    </div>
  );
}

export default Profiles;
