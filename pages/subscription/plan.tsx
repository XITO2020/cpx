import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { CustomSession } from '@/lib/types';
import Navbar from '@/components/Navbar';
import FormSubscription from '@/components/FormSubscription';

interface PlanProps {
  session: CustomSession | null;
  planId: string;
}

const plans = {
  basic: {
    name: 'Basic',
    price: 9.99,
    features: ['HD streaming', 'Watch on any device', 'Cancel anytime'],
    description: 'Perfect for starters',
  },
  standard: {
    name: 'Standard',
    price: 14.99,
    features: ['Full HD streaming', 'Download & watch offline', 'Family sharing (2 devices)'],
    description: 'Most popular choice',
  },
  premium: {
    name: 'Premium',
    price: 19.99,
    features: ['4K Ultra HD', 'HDR content', 'Family sharing (4 devices)', 'Exclusive content'],
    description: 'Ultimate experience',
  },
};

const Plan: React.FC<PlanProps> = ({ session, planId }) => {
  const router = useRouter();
  const plan = plans[planId as keyof typeof plans];

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Navbar session={session} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Plan Not Found</h1>
          <button
            onClick={() => router.push('/subscription')}
            className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700 transition"
          >
            View All Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar session={session} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            {plan.name} Plan
          </h1>

          <div className="bg-zinc-900 rounded-lg p-8 mb-8">
            <div className="text-center mb-8">
              <p className="text-5xl font-bold text-white mb-2">
                ${plan.price}
                <span className="text-lg text-gray-400">/month</span>
              </p>
              <p className="text-gray-400">{plan.description}</p>
            </div>

            <div className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center text-white">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>

            <FormSubscription plan={plan.name.toLowerCase()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { plan } = context.params || {};

  return {
    props: {
      session,
      planId: plan || null,
    },
  };
};

export default Plan;