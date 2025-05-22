import React, { useState, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaDiscord, FaPatreon } from 'react-icons/fa';
import { SiMastodon, SiTiktok } from 'react-icons/si';
import { authOptions } from '../api/auth/[...nextauth]';
import Input from '@/components/ui/Input';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [variant, setVariant] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    setError('');
  }, []);

  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      await login();
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  }, [email, name, password, login]);

  const socialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      setError('');
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setError(`Failed to login with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full"
          >
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                  disabled={isLoading}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Input
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-3"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={variant === 'login' ? login : register}
              disabled={isLoading}
              className="bg-rose-600 py-3 text-white rounded-md w-full mt-10 hover:bg-rose-700 transition disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : variant === 'login' ? 'Login' : 'Sign up'}
            </motion.button>

            <div className="flex flex-col gap-4 mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-black">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => socialLogin('discord')}
                  className="flex items-center justify-center gap-2 bg-[#5865F2] text-white p-3 rounded-lg hover:bg-opacity-90"
                >
                  <FaDiscord size={20} />
                  Discord
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => socialLogin('patreon')}
                  className="flex items-center justify-center gap-2 bg-[#FF424D] text-white p-3 rounded-lg hover:bg-opacity-90"
                >
                  <FaPatreon size={20} />
                  Patreon
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => socialLogin('mastodon')}
                  className="flex items-center justify-center gap-2 bg-[#6364FF] text-white p-3 rounded-lg hover:bg-opacity-90"
                >
                  <SiMastodon size={20} />
                  Mastodon
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => socialLogin('tiktok')}
                  className="flex items-center justify-center gap-2 bg-black text-white p-3 rounded-lg hover:bg-opacity-90"
                >
                  <SiTiktok size={20} />
                  TikTok
                </motion.button>
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Conspix?' : 'Already have an account?'}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </motion.button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }

  return {
    props: {}
  };
};