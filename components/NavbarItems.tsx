import React from 'react';
import { motion } from 'framer-motion';
import NavbarItem from './NavbarItem';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 }
};

const NavbarItems: React.FC = () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Series', href: '/series' },
    { label: 'Films', href: '/films' },
    { label: 'NewPopular', href: '/new' },
    { label: 'MyList', href: '/favorites' },
    { label: 'Browse', href: '/languages' }
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex-row ml-8 gap-7 hidden lg:flex"
    >
      {items.map((item) => (
        <motion.div key={item.href} variants={item}>
          <NavbarItem label={item.label} href={item.href} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default NavbarItems;
```