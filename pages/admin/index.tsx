import React from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useForm } from 'react-hook-form';
import { useSessionContext } from '@/contexts/sessionContext';
import { authOptions } from '../api/auth/[...nextauth]';
import { CustomSession } from '@/lib/types';
import AdminLayout from './components/AdminLayout';
import AddLinkedArticleForm from './components/AddArticles';
import AddMovieForm from './components/AddMovies';
import ProfileUpdateForm from './components/ProfileUpdateForm';
import styles from './styles/Admin.module.scss';

interface DashboardProps {
  session: CustomSession | null;
  admin: boolean;
}

interface ProfileFormData {
  name: string;
  image: string;
}

const Dashboard: React.FC<DashboardProps> = ({ session, admin }) => {
  const customSession = useSessionContext();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <AdminLayout>
        <div className="p-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-8 text-center">
            Welcome to your dashboard, <span className="capitalize text-rose-500">{session.user.name}</span>!
          </h1>
          
          {!admin && (
            <p className="text-center text-rose-400 text-xl mb-8">
              Post articles, videos, and modify your profile here
            </p>
          )}

          <div className="space-y-12">
            <section className="bg-green-800/30 hover:bg-teal-950/60 duration-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-wider">
                Content Management
              </h2>
              
              <div className="space-y-8">
                <div className="bg-black/50 rounded-lg p-6">
                  <h3 className="text-xl text-white mb-4">Upload Videos</h3>
                  <AddMovieForm />
                </div>

                <div className="bg-black/50 rounded-lg p-6">
                  <h3 className="text-xl text-white mb-4">Write Articles</h3>
                  <AddLinkedArticleForm />
                </div>

                <div className="bg-black/50 rounded-lg p-6">
                  <h3 className="text-xl text-white mb-4">Profile Settings</h3>
                  <ProfileUpdateForm 
                    defaultValues={{
                      name: customSession?.user?.name || '',
                      image: customSession?.user?.image || ''
                    }}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const isAdmin = session.user.admin === true;

  return {
    props: {
      session,
      admin: isAdmin,
    },
  };
};

export default Dashboard;