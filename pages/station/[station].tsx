import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { CustomSession } from '@/lib/types';
import { authOptions } from '../api/auth/[...nextauth]';
import SubwayScene from '@/components/SubwayScene';
import Navbar from '@/components/Navbar';
import useStationMovie from '@/hooks/useStationMovie';
import useWindowSize from '@/hooks/useWindowSize';

interface StationPageProps {
  session: CustomSession | null;
}

const StationPage: React.FC<StationPageProps> = ({ session }) => {
  const router = useRouter();
  const { station } = router.query;
  const windowSize = useWindowSize();
  const { movie, isLoading, error } = useStationMovie(station as string);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Navbar session={session} />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Navbar session={session} />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
          <h1 className="text-2xl font-bold text-white mb-4">
            Error loading station
          </h1>
          <button
            onClick={() => router.back()}
            className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar session={session} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Station: {station}
        </h1>

        {movie && (
          <div className="bg-zinc-900 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {movie.title}
            </h2>
            <p className="text-gray-400 mb-4">
              {movie.description}
            </p>
            {movie.videoUrl && (
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <video
                  src={movie.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                  poster={movie.thumbnailUrl}
                />
              </div>
            )}
          </div>
        )}

        <div className="relative w-full" style={{ height: windowSize.height ? windowSize.height * 0.7 : 500 }}>
          <SubwayScene />
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<StationPageProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session
    }
  };
};

export default StationPage;