import prismadb from '@/lib/prismadb';
import { authOptions } from './api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { CustomSession } from '@/lib/types';
import Navbar from '@/components/Navbar'


type GamesProps = {
    session: CustomSession | null;
  };

const games : React.FC<GamesProps> = ({session}) => {
  return (
    <div>
      <Navbar session={session} />
      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<NavbarProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
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

  // Convertir la propriété createdAt en une chaîne de caractères
  if (user) {
    user.createdAt = user.createdAt.toISOString();
    user.createdAt = user.updatedAt.toISOString();
  }

  const movies = user ? user.favoriteMovies || [] : [];

  return {
    props: {
      session,
      movies,
    },
  };
};


export default games
