import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center pt-32"
    >
      <div className="relative w-[600px] h-[450px]">
        <Image
          src="/img/advised3.png"
          alt="Advised content"
          fill
          className="object-contain"
        />
      </div>

      <div className="w-[70%] mx-auto flex flex-col items-center mt-16">
        <h1 className="text-neutral-600 font-kghappy text-2xl tracking-wide flex items-center gap-4">
          <Image
            src="/img/top50.png"
            width={120}
            height={40}
            alt="Top 50"
            className="object-contain"
          />
          <span>des films tendances distribués par Conspix</span>
        </h1>

        <Link 
          href="/auth"
          className="text-neutral-600 hover:text-red-400 transition-colors mt-4"
        >
          Connectez-vous pour visionner le top 100 et plus encore !
        </Link>
      </div>
    </motion.div>
  );
};