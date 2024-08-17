import React from 'react';
import { useParams } from 'next/navigation'; // Remplacez useRouter par useParams
import FormSubscription from '@/components/FormSubscription';
import Navbar from '@/components/Navbar';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { CustomSession } from '@/lib/types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
      props: {
          session: session as CustomSession | null,
      },
  };
};

interface SubProps {
  session: CustomSession | null;
}

const SubscriptionPlan: React.FC<SubProps> = ({ session }) => {
    const params = useParams();
    const { plan } = params;

    if (!plan) {
        return <p>Loading...</p>;
    }

    return (
        <>
        <Navbar session={session} />
        
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center">Subscribe to {plan} Plan</h1>
            <FormSubscription plan={String(plan)} />
        </div>
        </>
    );
};

export default SubscriptionPlan;
