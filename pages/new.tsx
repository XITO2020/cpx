import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { CustomSession, Movie, LinkedArticle } from '@/lib/types';
import { authOptions } from './api/auth/[...nextauth]';
import prismadb from '@/lib/prismadb';
import Navbar from '@/components/Navbar';
import Blog from '@/components/blog/blog';
import Top100 from '@/components/top100';

interface EditorialProps {
  session: CustomSession | null;
  admin: boolean;
  movies: Movie[];
  articles: LinkedArticle[];
}

const New: React.FC<EditorialProps> = ({ session, admin, movies, articles }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar session={session} />
      <Top100 />
      
      <section className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition">
            <h2 className="text-xl font-bold text-white mb-4">Latest Updates</h2>
            <p className="text-gray-300">Development completed for France region</p>
          </div>

          <div className="space-y-4">
            <div className="bg-zinc-900 p-6 rounded-lg hover:bg-yellow-100 hover:text-black transition">
              <p>NFTs now available</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg hover:bg-yellow-200 hover:text-black transition">
              <p>Conspix teaser boycott situation</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-lg hover:bg-green-400 hover:text-black transition">
            <p>Dark Fantasy: Understanding the Issues</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg hover:bg-amber-400 hover:text-black transition">
            <p>Gaza Coverage: A Critical Analysis</p>
          </div>
        </div>
      </section>

      <div className="mt-16">
        <Blog 
          movies={movies} 
          articles={articles} 
          session={session} 
          page="new" 
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<EditorialProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  try {
    const [movies, articles] = await Promise.all([
      prismadb.movie.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10
      }),
      prismadb.linkedArticle.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10
      })
    ]);

    return {
      props: {
        session,
        admin: session?.user?.admin ?? false,
        movies,
        articles,
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        session,
        admin: session?.user?.admin ?? false,
        movies: [],
        articles: [],
      }
    };
  }
};

export default New;