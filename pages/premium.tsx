import Navbar from '@/components/Navbar';
import { CustomSession } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface PremiumProps {
    session: CustomSession | null;
}

export const getServerSideProps: GetServerSideProps<PremiumProps> = async (context) => {
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


const Premium: React.FC<PremiumProps> = ({ session }) => {
    return (
        <>
            <Navbar session={session} />
            <section className="premiumcontainer flex flex-col w-full justify-center items-center pt-12 min-h-66vh">
                <div className="slogansale text-neutral-500 text-center w-full">
                    <h1 className="text-md">Supportez Conspix en choisissant votre abonnement</h1>
                    <h2 className="text-fuchsia-800 text-lg hover:text-yellow-400">🎞️ Accès aux films inédits ! 🎞️</h2>
                    <h2 className="text-violet-600 text-lg hover:text-yellow-400">📫 Postez des articles hyper facilement ! 📰✒️</h2>
                    <h2 className="text-rose-300 text-lg hover:text-yellow-400"> 🎬 Ajoutez des films, votez pour eux, et gagnez des concours ! 🎬</h2>
                    <h2 className="text-pink-600 text-lg hover:text-yellow-400"> 🎮 Faites partie de la mise en place d'un jeu plein de vérités qui nous rémunérera tous ! 💰</h2>
                </div>

                <section className="bg-black w-full py-8 px-4 flex flex-col md:flex-row justify-evenly items-center mb-12">
                
                    <div className="offer bg-rose-400 bg-opacity-10 hover:ease-in duration-1000 hover:bg-opacity-80 hover:bg-pink-600">
                        <div className="offer-container text-white">
                            <h2 className="font-bebas font-light text-2xl">4 mois <br/>+ 4 NFT offers</h2>
                            <h3>25% des bénéfices reversés à la Pastèque</h3>
                            <img src="/img/memegneto.png" alt="memegneto nft" className="h-[40vh] w-full md:h-[25vh] md:w-[200px]" /> 
                            <p className="text-6xl text-orange-300">4.44€</p>
                            <Link href="/subscription/nft-bonus" className="buyIt">Selectionner</Link>
                        </div>
                    </div>
                    
                    <div className="offer bg-pink-500 bg-opacity-10 hover:ease-in duration-1000 hover:bg-opacity-80 hover:bg-yellow-400 flex flex-col items-center justify-evenly">
                        <div className="offer-container text-white">
                            <h2 className="font-bebas text-center font-light text-xl">8 mois + 1 ebook: Volume I de Guerres Sources et Maudits</h2>
                            <h3>50% des bénéfices reversés à la Pastèque</h3>
                            <img src="/img/ebook1080.jpg" alt="gsm tome ebook" className="h-[60vh] w-[300px] md:h-[25vh] md:w-[200px]" />
                            <p className="text-6xl text-orange-300">8.88€</p>
                            <Link href="/subscription/ebook" className="buyIt">Selectionner</Link>
                        </div>    
                    </div>
                    
                    <div className="offer bg-purple-700 bg-opacity-10 hover:ease-in duration-1000 hover:bg-opacity-80 hover:bg-violet-600 flex flex-col items-center justify-evenly">
                        <div className="offer-container text-white">
                            <h2 className="font-bebas font-light text-center">14 mois + Guerres Sources Maudits tome 1, version papier</h2>
                            <h3>70% des bénéfices reversés à la Pastèque</h3>
                            <img src="/img/editionpapier.png" alt="gsm tome pap" className="h-[60vh] w-[300px] md:h-[25vh] md:w-[200px]" />
                            <p className="text-6xl text-orange-300">14.41€</p>
                            <Link href="/subscription/real-book" className="buyIt">Selectionner</Link>
                        </div>     
                    </div>
                </section>
            </section>
            <section className="payment"></section>
        </>
    );
};

export default Premium;
