import '@/styles/globals.css';
import '@/styles/fonts.css';
import '@/styles/metro.css'
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <Footer/>
    </SessionProvider>
    
  );
}
