import React from 'react';
import AdminLayout from './components/AdminLayout';
import { GetServerSideProps } from 'next';
import { CustomSession } from '@/lib/types';
import AddLinkedArticleForm from './components/AddArticles';
import AddMovieForm from './components/AddMovies';
import { useSessionContext } from '@/contexts/sessionContext';
import { useForm } from 'react-hook-form'; // Importer useForm
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import styles from "./page.module.scss"

interface DashboardProps {
  session: CustomSession | null;
  admin: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ session, admin }) => {
  const isAdmin = admin;
  const customSession = useSessionContext();
  const { register, handleSubmit, formState: { errors } } = useForm(); 

  const onSubmit = (data: any) => {
    
    console.log(data);
  };

  return (
    <div className="-z-20">
    <AdminLayout>
      
      <div className="p-4 m-4 -z-10">
        <h1 className="text-center text-md">Bienvenue sur votre dashboard, <span className="capitalize">{session?.user?.name}</span> !</h1>
        {!isAdmin && <p className="text-center text-rose-400 text-xl my-6 z-10">Postez des articles, des vidéos et modifiez votre profil ici</p>}
        <section className="w-full min-h-screen bg-green-800 hover:bg-teal-950 bg-opacity-30 hover:bg-opacity-60 duration-500 m-4 p-4 -z-10">
          
          <h2 className="text-center font-awak tracking-widest z-10">Postez jusque <span className="font-evogria">12</span> videos pour gagner</h2>
          <AddMovieForm />
        
          <h2 className="text-center font-awak tracking-widest z-10">Ecrivez un article en lien avec une des vidéos de conspix</h2>
          <AddLinkedArticleForm />
          
          <h2 className="text-center font-evogria tracking-widest z-10">Changez de nom et d'image</h2>

          <form className="flex flex-col items-center bg-black p-8 mx-auto mt-8 mb-4 text-neutral-400 w-[50%] z-10" onSubmit={handleSubmit(onSubmit)}>

            <div className="w-full flex justify-center">
              <input className={`text-center bg-rose-500 hover:bg-yellow-300 hover:text-black rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowyellow} `}{...register('name', { required: 'Un nom unique est requis' })} placeholder="Le nom que vous voulez" defaultValue={customSession?.user?.name} />
              {errors.name && typeof errors.name.message === 'string' && <span>{errors.name.message}</span>}
            </div>


            <div className="w-full flex justify-center">
              <input className={`text-center bg-indigo-600 hover:bg-fuchsia-600 hover:text-black rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowfuchsia} `} {...register('Votre image')} placeholder="URL de votre image personnelle" defaultValue={customSession?.user?.image} />
              {errors.image && typeof errors.image.message === 'string' && <span>{errors.image.message}</span>}
            </div>
            
            <div className="w-full flex justify-center">
              <p className={`text-center bg-yellow-600 hover:bg-teal-300 text-black rounded-md ${styles.inputfield} ${styles.shadowteal} `}{...register('name', { required: 'Un nom unique est requis' })} placeholder="Le nom que vous voulez" defaultValue={customSession?.user?.name}>
              Votre code de reduction-20%:  0000</p>
            </div>

            <button className="bg-neutral-800 text-rose-500 font-extrabold w-full rounded-md py-2 mt-5 mb-2 hover:bg-neutral-700 hover:outline-slate-600 hover:outline-double hover:text-rose-700 " type="submit">Mettre à jour votre profil</button>

          </form>
        </section>
      </div>
    </AdminLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return {
      redirect: {
        destination: '/contact',
        permanent: false,
      },
    };
  }

  const isAdmin = session.user.admin === false;

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
      session,
      isAdmin,
    },
  };
};

export default Dashboard;
