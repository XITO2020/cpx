import React from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { motion } from 'framer-motion';
import { authOptions } from '../api/auth/[...nextauth]';
import { CustomSession } from '@/lib/types';
import AdminLayout from '@/components/admin/AdminLayout';
import ContentModeration from '@/components/admin/ContentModeration';
import UserManagement from '@/components/admin/UserManagement';
import Statistics from '@/components/admin/Statistics';

interface AdminDashboardProps {
  session: CustomSession | null;
}

export default function AdminDashboard({ session }: AdminDashboardProps) {
  return (
    <AdminLayout>
      <div className="p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-8"
        >
          Admin Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Statistics />
          <ContentModeration />
          <UserManagement />
        </div>
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.admin) {
    return {
      redirect: {
        destination: '/',
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