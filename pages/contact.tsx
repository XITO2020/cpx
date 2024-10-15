import { GetServerSideProps, NextPageContext } from 'next';
import { getServerSession } from 'next-auth';
import Navbar from '@/components/Navbar';
import { CustomSession, Movie } from "@/lib/types";
import { authOptions } from './api/auth/[...nextauth]';
import prismadb from '@/lib/prismadb'; //
import { useRouter } from 'next/navigation';
import FAQ from '@/components/Faq';


type ContactProps = {
  session: CustomSession | null;
  movies: Movie[] | null;
};


export const getServerSideProps: GetServerSideProps<ContactProps> = async (context) => {
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


export default function contact ({ session, movies }: ContactProps) {

  const router = useRouter();

    return (
          <>
            <Navbar session={session} />
            <div className="w-full min-h-screen bg-gradient-to-r from-amber-900 to-black px-16 py-24 text-stone-400">
                <div className="w-[800px] mx-auto flex flex-wrap justify-evenly mt-16 font-evogria">
                <div className="contact-square hover:bg-yellow-300">
                  <h2>use vpn... send mail to this temporarymail with a temporary mail</h2>
                </div>
                <div className="contact-square hover:bg-green-300">
                  <h2>Mettre votre publicité dans le site</h2>
                </div>
                <div className="contact-square hover:bg-teal-300">
                  <h2>Vous êtes une association</h2>
                </div>
                <div className="contact-square hover:bg-green-400">
                  <h2>Devenir modérateur</h2>
                </div>
                <div className="contact-square hover:bg-amber-300">
                  <h2>Acheter plus de NFT</h2>
                </div>
                <div className="contact-square hover:bg-fuchsia-300">
                  <h2>Demander un service numérique</h2>
                </div>
                <div className="contact-square hover:bg-violet-300">
                  <h2>Aider au développement de jeux en ligne (javascript python)</h2>
                </div>
                <div className="contact-square hover:bg-pink-300">
                  <h2>Nous soutenir financièrement</h2>
                </div>
                <div className="contact-square hover:bg-violet-700">
                  <h2>Soumettre une catégorie de film</h2>
                </div>
                <div className="contact-square hover:bg-purple-700">
                  <h2>Nous recommander votre site pour un partenariat</h2>
                </div>
                </div>
        
                
                
                

                <div className="faq tex-black">
                  <h2>FAQ</h2>
                  <FAQ />
                </div>
            </div>

            


            <div className="flex items-center justify-center gap-8 mt-2 mb-10">
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
          <div onClick={() => {session?.user?.isPremium ? router.push('/new') : router.push('/premium') }}>
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
              
              <div className="absolute bottom-0 left-0 w-full text-center text-violet-600 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                Sélection Premium
              </div>
            </div>
          </div>
        </div>
            
        </>
    )
}
