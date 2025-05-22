import React from 'react';
import { motion } from 'framer-motion';

const ArtgoldLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-600 to-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        <motion.img
          src="/logo-artgold.png"
          alt="Artgold"
          className="w-64 h-64 mx-auto mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-gray-300 text-transparent bg-clip-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ARTGOLD
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-yellow-200 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Make gold with your art
        </motion.p>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-300 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          L'argent doit redevenir l'art des gens
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ArtgoldLanding;