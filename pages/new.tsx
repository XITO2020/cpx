import Navbar from '@/components/Navbar';
import { useSessionContext } from '@/contexts/sessionContext';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { CustomSession } from '@/lib/types';
import { authOptions } from './api/auth/[...nextauth]';
import Blog from '@/components/blog/blog';

interface EditorialProps {
  session: CustomSession | null;
  admin: boolean;
  data: any; // Assurez-vous que data contient les informations nécessaires pour movie
  movies: any[];
  articles: any[];
}

const New: React.FC<EditorialProps> = ({ session, admin, data, movies, articles }) => {
  const isAdmin = admin;
  const customSession = useSessionContext();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="newbackground w-full relative -top-10">
      <Navbar session={session} />

      <section className="edito">
        <div className="sorties bg-zinc-900">
           <p></p> J'ai terminé la Fronce
        </div>
        <div className="news-container">
          <div className="news bg-zinc-900 hover:bg-yellow-100"><p>Vos nft sont disponibles</p></div>
          <div className="news bg-zinc-900 hover:bg-yellow-200"><p>Le teaser de Conspix boycotté</p> </div>
        </div>
        <div className="news-container">
          <div className="news bg-zinc-900 hover:bg-green-400"><p>C'est quoi le pb avec la darkFantaisy</p></div>
          <div className="news bg-zinc-900 hover:bg-amber-400"><p>Comment ça, on en peut plus de Gaza?</p></div>
        </div>
      </section>

      <div className="relative top-72 mb-72">
        <Blog movie={data} movies={movies} articles={articles} session={session} page="new" />
      </div>
    </div>
  );
};

export default New;

// Exemple de GetServerSideProps pour récupérer les données nécessaires
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const admin = session?.user?.admin === true;

  // Remplacez par votre logique pour récupérer les données nécessaires
  const data = {}; // Remplacez par les données réelles pour movie
  const movies = []; // Remplacez par les données réelles pour movies
  const articles = []; // Remplacez par les données réelles pour articles

  return {
    props: {
      session,
      admin,
      data,
      movies,
      articles,
    },
  };
};
