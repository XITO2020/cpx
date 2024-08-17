import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

type FormValues = {
  name: string;
  email: string;
  plan: string;
};

const FormSubscription: React.FC<{ plan: string }> = ({ plan }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(`/api/webhook/${plan.toLowerCase()}`, data);
      if (response.status === 200) {
        // Redirection après le succès du paiement
        router.push('/success');
      } else {
        // Gérer les erreurs
        console.error('Payment failed');
        router.push('/error');
      }
    } catch (error) {
      console.error('Payment error:', error);
      router.push('/error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Subscribe to {plan} Plan</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <input type="hidden" value={plan} {...register('plan')} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Subscribe
      </button>
    </form>
  );
};

export default FormSubscription;
