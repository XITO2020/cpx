import React from 'react';
import { motion } from 'framer-motion';

const ExposedLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        <motion.div
          className="text-6xl md:text-8xl font-bold mb-8 text-purple-500"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          SORCERY
        </motion.div>
        
        <motion.h1 
          className="text-2xl md:text-4xl font-bold mb-6 text-purple-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Expose the Hidden Truth
        </motion.h1>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {['Uncover', 'Reveal', 'Expose'].map((word, index) => (
            <motion.div
              key={word}
              className="bg-purple-800/50 p-4 rounded-lg"
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

export default ExposedLanding;