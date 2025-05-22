import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { motion, AnimatePresence } from 'framer-motion';
import { authOptions } from '../api/auth/[...nextauth]';
import { CustomSession, Movie } from '@/lib/types';
import Navbar from '@/components/Navbar';
import VideoCollections from '@/components/profile/VideoCollections';
import CreateCollection from '@/components/profile/CreateCollection';
import useCurrentUser from '@/hooks/useCurrentUser';
import useMovieList from '@/hooks/useMovieList';

interface ProfileProps {
  session: CustomSession | null;
}

const Profile: React.FC<ProfileProps> = ({ session }) => {
  const { data: currentUser } = useCurrentUser();
  const { movies } = useMovieList();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const systemCategories = [
    'War',
    'Health',
    'TV',
    'Politics',
    'Social Networks',
    'Conspiracies',
    'Technology',
    'History'
  ];

  const sortOptions = [
    { id: 'rating', label: 'Highest Rated' },
    { id: 'views', label: 'Most Viewed' },
    { id: 'recent', label: 'Recently Added' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar session={session} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 rounded-lg p-8 mb-8"
          >
            <div className="flex items-center gap-6">
              <img
                src={currentUser?.image || '/img/avatars-kings.png'}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {currentUser?.name}'s Collections
                </h1>
                <p className="text-gray-400">
                  Member since {new Date(currentUser?.createdAt || '').toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* System Categories */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-zinc-900 rounded-lg p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Conspix Categories
              </h2>
              <div className="space-y-2">
                {systemCategories.map((category) => (
                  <button
                    key={category}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-zinc-800 text-gray-300 hover:text-white transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* User Collections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Your Collections
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                >
                  Create Collection
                </motion.button>
              </div>

              <VideoCollections 
                movies={movies} 
                systemCategories={systemCategories}
                sortOptions={sortOptions}
              />
            </motion.div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showCreateModal && (
          <CreateCollection
            onClose={() => setShowCreateModal(false)}
            systemCategories={systemCategories}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    };
  }

  return {
    props: {
      session
    }
  };
};

export default Profile;