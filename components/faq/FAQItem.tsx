import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQItemData } from './types';

interface FAQItemProps {
  item: FAQItemData;
  isActive: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ item, isActive, onToggle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-gray-200"
    >
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onToggle}
        className="w-full text-left py-4 px-6 bg-gray-950 hover:bg-stone-300 hover:text-gray-700 focus:outline-none transition-colors rounded-t-lg"
      >
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">{item.question}</span>
          <motion.span
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-white text-xl"
          >
            {isActive ? '−' : '+'}
          </motion.span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="py-4 px-6 bg-gradient-to-r from-amber-100 to-pink-100 rounded-b-lg">
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-800"
              >
                {item.answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;