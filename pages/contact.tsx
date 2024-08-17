import { GetServerSideProps, NextPageContext } from 'next';
import { getServerSession } from 'next-auth';
import Navbar from '@/components/Navbar';
import { CustomSession, Movie } from "@/lib/types";
import { authOptions } from './api/auth/[...nextauth]';
import prismadb from '@/lib/prismadb'; //

type ContactProps = {
  session: CustomSession | null;
  movies: Movie[] | null;
};

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (context) => {
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

  const movies = user?.favoriteMovies || [];

  return {
    props: {
      session,
      movies,
    },
  };
};


export default function contact ({ session, movies }: ContactProps) {
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen bg-amber-700 px-16 py-24">
                <h1>Contact...</h1>
                link to f-society
                use vpn...
                send mail to this temporarymail with a temporary mail
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
              <div className="mt-4 text-gray-400
                          text-2xl text-center
                          group-hover:text-white">
                {session?.user?.name}
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
                {!session?.user || !session?.user?.image ? (<img src="/img/cinema.png" alt="avatar test" />)
                  : (<img src={session?.user?.image} alt="image test" />)}
              </div>
              <div className="mt-4 text-gray-400
                          text-2xl text-center
                          group-hover:text-white">
                {session?.user?.name}
              </div>
              <div className="absolute bottom-0 left-0 w-full text-center text-violet-600 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                Sélection Premium
              </div>
            </div>
          </div>
        </div>
            
        </>
    )
}
