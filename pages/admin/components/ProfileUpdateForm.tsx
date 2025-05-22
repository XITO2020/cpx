import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles/Admin.module.scss';

interface ProfileFormData {
  name: string;
  image: string;
}

interface ProfileUpdateFormProps {
  defaultValues: ProfileFormData;
}

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({ defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Handle success (e.g., show toast notification)
    } catch (error) {
      console.error('Profile update error:', error);
      // Handle error (e.g., show error toast)
    }
  };

  return (
    <form 
      className="space-y-4" 
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          className={`${styles.inputfield} ${styles.shadowyellow} bg-rose-500 hover:bg-yellow-300`}
          {...register('name', { required: 'Name is required' })}
          placeholder="Your display name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          className={`${styles.inputfield} ${styles.shadowfuchsia} bg-indigo-600 hover:bg-fuchsia-600`}
          {...register('image')}
          placeholder="Profile image URL"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
      </div>

      <div className={`${styles.inputfield} ${styles.shadowteal} bg-yellow-600 hover:bg-teal-300`}>
        <p className="text-black text-center">
          Your discount code: 0000
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-neutral-800 text-rose-500 font-bold py-2 px-4 rounded hover:bg-neutral-700 hover:text-rose-400 transition duration-200"
      >
        Update Profile
      </button>
    </form>
  );
};

export default ProfileUpdateForm;