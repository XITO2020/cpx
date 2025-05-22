import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import Randomizer from '../Randomizer';

interface MobileMenuProps {
  visible?: boolean;
  onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible, onClose }) => {
  const router = useRouter();
  const t = useTranslations();

  const menuItems = [
    { label: t('nav.home'), href: '/', hoverClass: 'hover:bg-emerald-950' },
    { label: t('nav.series'), href: '/series', hoverClass: 'hover:bg-fuchsia-800' },
    { label: t('nav.films'), href: '/films', hoverClass: 'hover:bg-pink-600' },
    { label: t('nav.newPopular'), href: '/new', hoverClass: 'hover:bg-emerald-700 hover:text-yellow-400 hover:font-bold' },
    { label: t('nav.myList'), href: '/favorites', hoverClass: 'hover:bg-rose-500' },
    { label: t('nav.browse'), href: '/languages', hoverClass: 'hover:bg-fuchsia-500' },
  ];

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex rounded-lg shadow-lg"
      >
        <div className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`px-3 text-center text-white ${item.hoverClass} rounded-md p-2 transition-all duration-300`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 text-center text-pink-400 hover:bg-violet-600 hover:text-white rounded-md p-2 font-toejam relative"
          >
            <Randomizer />
            <motion.img
              src="/img/conspix/sandia.png"
              alt="Support Gaza"
              className="sandia-mobile"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu;