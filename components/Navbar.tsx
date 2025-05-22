import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';
import { CustomSession } from '@/lib/types';
import AccountMenu from './account/AccountMenu';
import MobileMenu from './mobile/MobileMenu';
import NavbarItem from './NavbarItem';

interface NavbarProps {
  session: CustomSession | null;
}

const TOP_OFFSET = 66;

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY >= TOP_OFFSET);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <motion.nav 
      className="w-full fixed z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className={`
        px-4 md:px-16 py-6 flex items-center transition duration-500
        ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
      `}>
        <Link href="/">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/logo.png"
            alt="Logo"
            className="h-8"
          />
        </Link>

        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" href="/" />
          <NavbarItem label="Series" href="/series" />
          <NavbarItem label="Films" href="/films" />
          <NavbarItem label="New & Popular" href="/new" />
          <NavbarItem label="My List" href="/favorites" />
          <NavbarItem label="Browse by languages" href="/languages" />
        </div>

        <div 
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <AnimatePresence>
            {showMobileMenu && <MobileMenu />}
          </AnimatePresence>
        </div>

        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch className="w-6 h-6" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell className="w-6 h-6" />
          </div>

          <div 
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src={session?.user?.image || "/default-blue.png"} alt="" />
            </div>
            <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AnimatePresence>
              {showAccountMenu && (
                <AccountMenu visible={showAccountMenu} onClose={() => setShowAccountMenu(false)} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;