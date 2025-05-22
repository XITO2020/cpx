```tsx
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import useInfoModal from '@/hooks/useInfoModal';
import useRandomVideo from '@/hooks/useRandomVideo';

const GZ_URLS = [
  'https://linktr.ee/amranmaxa',
  'https://www.gofundme.com/f/help-mahmouds-mother-get-medical-care',
  'https://www.gofundme.com/f/help-my-family-from-gaza-have-a-safe-secure-life',
  'https://www.gofundme.com/f/help-rahaf-her-family-get-out-of-gaza',
  'https://www.gofundme.com/f/pour-sauver-les-familles-deplacees-de-guerre-rdc',
  'https://www.gofundme.com/f/help-my-family-to-leave-gaza-for-treatment-i-have-an-injure',
  'https://www.gofundme.com/f/help-rescue-family-from-gazas-crisis',
];

const TK_URLS = [
  'https://www.tiktok.com/@helmyfamily/video/7371388853577436417',
];

const Randomizer: React.FC = () => {
  const { openModal } = useInfoModal();
  const { randomVideo, isLoading } = useRandomVideo();

  const getRandomUrl = useCallback(() => {
    const urls = Math.random() > 0.5 ? GZ_URLS : TK_URLS;
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
  }, []);

  const handleClick = useCallback(() => {
    if (isLoading || !randomVideo) return;

    // Open random external URL in new tab
    const randomUrl = getRandomUrl();
    window.open(randomUrl, '_blank');

    // Open info modal with random video
    openModal(randomVideo.id);
  }, [getRandomUrl, openModal, randomVideo, isLoading]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      disabled={isLoading}
      className="relative text-xl font-bold text-rose-500 hover:text-rose-400 transition-colors duration-300 disabled:opacity-50"
    >
      <span className="relative z-10">
        {isLoading ? 'Loading...' : 'Randomizer ! ! !'}
      </span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-rose-500/20 rounded-lg -z-10"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
};

export default Randomizer;
```