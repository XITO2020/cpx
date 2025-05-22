import { GetServerSideProps } from 'next';
import { getDomain } from '../lib/dns';
import { CustomSession } from '@/lib/types';
import { IncomingMessage } from 'http';

interface HomePageProps {
  domain: 'evilempire' | 'sorcery' | 'conspix' | 'local' | null;
  session?: CustomSession | null;
}

const HomePage: React.FC<HomePageProps> = ({ domain, session }) => {
  return (
    <div>
      <h1>Bienvenue sur {domain}</h1>
      {session && (
        <div>
          <p>Utilisateur connecté : {session.user?.name}</p>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req as IncomingMessage;
  const domain = getDomain(req);

  // Votre logique ici en fonction du domaine

  return {
    props: {
      domain,
    },
  };
};

export default HomePage;
