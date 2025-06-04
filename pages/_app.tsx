import { ThemeProvider } from '@/components/ThemeProvider';
import { UserProvider } from '../contexts/UserContext'; // Adjust path as needed
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </UserProvider>
    </SessionProvider>
  );
}