import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getRandomNotFoundImage } from '@/utils/random404Image';

export default function Custom404() {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setBackgroundImage(getRandomNotFoundImage());
  }, []);

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/80 p-8 rounded-lg text-center max-w-lg mx-4"
      >
        <h1 className="text-6xl font-bold text-rose-500 mb-4">404</h1>
        <p className="text-xl text-white mb-8">
          Oops! This page seems to have vanished into the digital void.
        </p>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors"
          >
            Return Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}