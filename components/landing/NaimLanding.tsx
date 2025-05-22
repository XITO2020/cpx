import React from 'react';
import { motion } from 'framer-motion';

const NaimLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        <motion.div
          className="text-6xl md:text-8xl font-bold mb-8 text-white"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          NAIM
        </motion.div>
        
        <motion.h1 
          className="text-2xl md:text-4xl font-bold mb-6 text-rose-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No Artificial Intelligence Market
        </motion.h1>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {['Human', 'Authentic', 'Original'].map((word, index) => (
            <motion.div
              key={word}
              className="bg-zinc-800 p-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-white text-xl">{word}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NaimLanding;