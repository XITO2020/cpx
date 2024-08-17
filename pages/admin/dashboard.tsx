import React from 'react';
import AdminLayout from './components/AdminLayout';
import { GetServerSideProps } from 'next';
import { CustomSession } from '@/lib/types';
import AddLinkedArticleForm from './components/AddArticles';
import AddMovieForm from './components/AddMovies';
import { useSessionContext } from '@/contexts/sessionContext';
import { useForm } from 'react-hook-form'; // Importer useForm
import serverAuth from '@/lib/serverAuth'; // Importer serverAuth

interface DashboardProps {
  session: CustomSession | null;
  isAdmin: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ session, isAdmin }) => {
  const customSession = useSessionContext();
  const { register, handleSubmit, formState: { errors } } = useForm(); // Utiliser useForm

  const onSubmit = (data: any) => {
    // Soumettre les données du formulaire à votre API ou traiter localement
    console.log(data);
  };

  return (
    <AdminLayout>
      <div>
        <h1>Welcome to the Dashboard, {customSession?.user?.name}!</h1>
        {isAdmin && <p>You are an administrator!</p>}
        <section className="w-full min-h-screen bg-teal-800">
          <h2>Add Linked Article</h2>
          <AddLinkedArticleForm />
          <h2>Add Movie</h2>
          <AddMovieForm />
          <h2>Update Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Name</label>
              <input {...register('name', { required: 'Name is required' })} placeholder="Name" defaultValue={customSession?.user?.name} />
              {errors.name && typeof errors.name.message === 'string' && <span>{errors.name.message}</span>}
            </div>
            <div>
              <label>Image URL</label>
              <input {...register('image', { required: 'Image URL is required' })} placeholder="Image URL" defaultValue={customSession?.user?.image} />
              {errors.image && typeof errors.image.message === 'string' && <span>{errors.image.message}</span>}
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (context) => {
  try {
    const { customSession } = await serverAuth(context.req as any, context.res as any);

    if (!customSession || !customSession.user) {
      return {
        redirect: {
          destination: '/contact',
          permanent: false,
        },
      };
    }

    const isAdmin = customSession.user.admin === true;

    if (!isAdmin) {
      return {
        redirect: {
          destination: '/contact',
          permanent: false,
        },
      };
    }

    return {
      props: {
        session: customSession,
        isAdmin,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      redirect: {
        destination: '/contact',
        permanent: false,
      },
    };
  }
};

export default Dashboard;
