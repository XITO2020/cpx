import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface NavbarItemProps {
  label: string;
  href: string;
  className?: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, href, className }) => {
  const pathname = usePathname();
  const t = useTranslations();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative text-white cursor-pointer transition-colors duration-300 ${
          isActive ? 'text-rose-500' : 'hover:text-gray-300'
        } ${className || ''}`}
      >
        {t(`nav.${label.toLowerCase()}`)}
        {isActive && (
          <motion.div
            layoutId="navbar-underline"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-500"
            initial={false}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default NavbarItem;