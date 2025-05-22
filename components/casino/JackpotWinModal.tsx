import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface JackpotWinModalProps {
  amount: number;
  onClose: () => void;
}

export const JackpotWinModal: React.FC<JackpotWinModalProps> = ({
  amount,
  onClose,
}) => {
  React.useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-zinc-900 rounded-lg p-8 max-w-md w-full mx-4 text-center"
      >
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-rose-500 mb-4"
        >
          JACKPOT!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-white mb-6"
        >
          You won {amount} TabZ!
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mb-8"
        >
          Keep the popup window open for 1 minute to claim your prize!
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};