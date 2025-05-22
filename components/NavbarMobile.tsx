```tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavbarItem from './NavbarItem';

interface NavbarMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ isOpen, onClose }) => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Series', href: '/series' },
    { label: 'Films', href: '/films' },
    { label: 'NewPopular', href: '/new' },
    { label: 'MyList', href: '/favorites' },
    { label: 'Browse', href: '/languages' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden"
        >
          <div className="flex flex-col items-center py-4 space-y-4 bg-zinc-900 rounded-b-lg">
            {items.map((item) => (
              <NavbarItem
                key={item.href}
                label={item.label}
                href={item.href}
                className="text-lg py-2"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavbarMobile;
```