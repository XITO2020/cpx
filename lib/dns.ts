import { IncomingMessage } from 'http';

export function getDomain(req: IncomingMessage): 'evilempire' | 'sorcery' | 'conspix' | 'local' | null {
  const host = req.headers['host'];

  // Vérifier si l'application est en mode développement
  if (process.env.NODE_ENV === 'development') {
    return 'local';
  }

  if (host?.includes('conspix.tv')) {
    return 'conspix';
  } else if (host === null) {
    return null;
  } else {
    return 'sorcery'; // ou 'evilempire' selon votre préférence
  }
}
