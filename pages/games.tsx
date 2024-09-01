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

export default games
