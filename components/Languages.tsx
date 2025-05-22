import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsCheck } from 'react-icons/bs';
import { useRouter, usePathname } from 'next-intl/client';
import { locales, localeNames } from '@/lib/i18n/settings';
import { useTranslations } from 'next-intl';

interface LanguageMenuProps {
  visible?: boolean;
  onClose?: () => void;
  toggleLangMenu?: () => void;
}

const Languages: React.FC<LanguageMenuProps> = ({ visible, onClose, toggleLangMenu }) => {
  const langMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLocale, setSelectedLocale] = useState(router.locale);
  const t = useTranslations();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleLanguageChange = async (locale: string) => {
    setSelectedLocale(locale);
    await router.push(pathname, { locale });
    onClose?.();
  };

  if (!visible) return null;

  return (
    <motion.div
      ref={langMenuRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-full right-0 mt-2 bg-zinc-900 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-4">
        {locales.map((locale) => (
          <motion.button
            key={locale}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLanguageChange(locale)}
            className="flex items-center w-full p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <img
              src={`/img/flags/${locale}.png`}
              alt={localeNames[locale]}
              className="w-8 h-8 object-cover rounded-full mr-3"
            />
            <span className="text-white text-sm flex-1">
              {localeNames[locale]}
            </span>
            {selectedLocale === locale && (
              <BsCheck className="text-green-500 text-xl" />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Languages;