import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/styles/fonts.css';
import '@/styles/metro.css'
import '@/styles/globals.css';
import '@/styles/smartphones.css';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/Footer';

const queryClient = new QueryClient();


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Footer/>
      </QueryClientProvider>
    </SessionProvider>
    
  );
}
