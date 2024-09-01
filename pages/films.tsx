import Navbar from '@/components/Navbar';
import React, {useState, useEffect} from "react";
import GridMovies from "@/components/GridMovies";
import Billboard from "@/components/Billboard";
import { GetServerSideProps, NextPageContext } from 'next';
import { getServerSession } from 'next-auth';
import { CustomSession, Movie } from "@/lib/types";
import { authOptions } from './api/auth/[...nextauth]';
import prismadb from '@/lib/prismadb'; //

type NavbarProps = {
    session: CustomSession | null;
    movies: Movie[] | null;
  };
  
  
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
  
    const movies = user?.favoriteMovies || [];
    
  
    return {
      props: {
        session,
        movies,
      },
    };
  };
  

export default function films ({ session, movies }: NavbarProps) {
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        if (isMuted) {
            const timer = setTimeout(() => {
                setIsMuted(false);
            }, 10000); // Délai de 2 secondes

            return () => clearTimeout(timer); // Nettoyez le timer si le composant est démonté
        }
    }, [isMuted]);
    return (
        <>
            <Navbar session={session} />
            <section className="cinema">
                
                <div id="mainscreen">
                    <iframe 
                        width="800" 
                        height="600" 
                        src={`https://www.youtube.com/embed/ycFmDOvEtus?autoplay=1${isMuted ? "&mute=1" : ""}`} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        >
                    </iframe>
                </div>
                
            </section>
            <GridMovies />
            <Billboard />
        </>
    )
}
