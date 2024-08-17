import React from 'react';
import FormSubscription from '../components/FormSubscription';

const SubscriptionContainer: React.FC = () => {
  const plans = [
    { name: 'Basic', description: 'Basic plan description', image: '/images/basic.png' },
    { name: 'Standard', description: 'Standard plan description', image: '/images/standard.png' },
    { name: 'Premium', description: 'Premium plan description', image: '/images/premium.png' }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Choose Your Subscription Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={plan.image} alt={`${plan.name} plan`} className="mb-4 w-full h-32 object-cover rounded" />
            <h2 className="text-2xl font-bold mb-2 text-center">{plan.name} Plan</h2>
            <p className="text-gray-700 mb-4 text-center">{plan.description}</p>
            <FormSubscription plan={plan.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionContainer;
