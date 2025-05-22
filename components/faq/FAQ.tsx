import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from './faqData';
import FAQItem from './FAQItem';

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 bg-opacity-60 bg-gradient-to-r from-stone-300 to-stone-600 rounded-lg shadow-md"
    >
      <motion.h1
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="text-3xl font-bold text-center mb-6 text-rose-700 hover:text-rose-500 transition-colors"
      >
        FAQ
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <AnimatePresence>
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isActive={activeIndex === index}
              onToggle={() => toggleAccordion(index)}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;