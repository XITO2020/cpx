import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomSession } from '@/lib/types';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';

interface AccountMenuProps {
  visible?: boolean;
  onClose?: () => void;
  session?: CustomSession | null;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
  visible,
  onClose,
  session,
}) => {
  const { user: currentUser, isLoading, error } = useCurrentUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSubwayClick = () => {
    if (!currentUser) return;
    if (!currentUser.isPremium) {
      setShowAuthModal(true);
    } else {
      router.push('/subway');
    }
  };

  if (!visible) return null;

  const user = session?.user || currentUser;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex rounded-md"
        ref={accountMenuRef}
      >
        <div className="flex flex-col gap-3">
          <div className="px-3 flex flex-row gap-3 items-center w-full group">
            {user?.image ? (
              <img src={user.image} alt="Profile" className="w-8 h-8 rounded-full" />
            ) : (
              <img src='/img/avatars-kings.png' className="w-8 rounded-md" alt="Default profile" />
            )}

            {user?.name ? (
              <Link
                href="/profiles"
                className="px-5 text-white text-md rounded-md p-4 hover:bg-fuchsia-600 transition-colors w-full"
              >
                {user.name}
              </Link>
            ) : (
              <Link
                href="/auth"
                className="px-8 w-full text-sm text-white hover:font-bold hover:bg-neutral-600 rounded-md py-4 hover:text-rose-500 transition-all"
              >
                👀 Watch all now!
              </Link>
            )}
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              href="/contact"
              className="px-20 text-white text-lg hover:bg-pink-600 rounded-md py-2 transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/premium"
              className="px-20 text-white text-lg hover:text-slate-700 hover:font-semibold hover:bg-yellow-400 rounded-md py-2 transition-all"
            >
              Premium
            </Link>

            <button
              onClick={handleSubwayClick}
              className="px-20 text-white text-lg hover:bg-emerald-950 hover:text-yellow-400 rounded-md py-2 transition-colors text-left"
            >
              Subway
            </button>
          </nav>

          {session && (
            <>
              <hr className="bg-gray-600 border-0 h-px my-4" />
              <button
                onClick={handleSignOut}
                className="px-3 text-center text-white text-sm hover:bg-violet-600 rounded-md mx-4 py-2 transition-colors"
              >
                Sign out from Conspix
              </button>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AccountMenu;
