import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const plans = [
  { 
    name: 'nFt 4 mOnTh',
    price: '$9.99',
    description: 'Access to exclusive NFT content',
    features: ['4 months access', 'HD streaming', 'Basic support'],
    image: '/images/basic.png'
  },
  { 
    name: 'ebook 8 moNtHe$',
    price: '$19.99',
    description: 'Digital library + streaming',
    features: ['8 months access', '4K streaming', 'Priority support', 'Exclusive ebooks'],
    image: '/images/standard.png'
  },
  { 
    name: 'Real book 14 M0nThEs',
    price: '$29.99',
    description: 'Complete physical + digital access',
    features: ['14 months access', '4K HDR streaming', '24/7 support', 'Physical books', 'Exclusive events'],
    image: '/images/premium.png'
  }
];

const SubscriptionContainer: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Choose Your Subscription Plan
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <div className="relative">
              <img 
                src={plan.image} 
                alt={`${plan.name} plan`} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 right-0 bg-rose-600 text-white px-4 py-2 rounded-bl-xl">
                {plan.price}/month
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-white">{plan.name}</h2>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
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
                  </li>
                ))}
              </ul>

              <Link href={`/subscription/${plan.name.toLowerCase()}`}>
                <button className="w-full bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors">
                  Select Plan
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionContainer;