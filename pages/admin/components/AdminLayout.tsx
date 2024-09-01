import React, { ReactNode } from 'react';
import styles from "../page.module.scss"
import Link from 'next/link';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="-z-20">
      <nav className={`tracking-widest w-full hover:bg-neutral-300 bg-neutral-800 h-24 hover:text-slate-700 font-earl extrabold text-red-600 text-2xl flex justify-evenly items-center ${styles.dashboardnav} `}>
        <Link href="/">
          <img src="/img/conspix/cpL.gif"width="300px" alt="conspix animation" className="hover:mix-blend-exclusion" />
        </Link>
        <Link href="/" className={`hover:text-fuchsia-900 hover:bg-neutral-200 p-2 rounded-2xl ${styles.shadowlight}`}>Retour aux films</Link>
        <Link href="/profiles" className={`hover:text-violet-800  hover:bg-neutral-200 p-2 rounded-2xl ${styles.shadowlight}`}>Retour au profil</Link>
        <Link href="https://www.tabascoity.com" target="_blank" className={`hover:text-indigo-700  hover:bg-neutral-200 p-2 rounded-2xl ${styles.shadowlight}`}>Shop & réductions abonnés</Link>
        <Link href="/contact" className={`hover:text-pink-700  hover:bg-neutral-200 p-2 rounded-2xl ${styles.shadowlight}`}>Contact pour pub éthique</Link>
      </nav>
      <div className="w-full bg-black text-3xl text-stone-300">
        {/* Navbar ou Header d'administration */}
        <header></header>
        
        {/* Contenu de la page */}
        <main className="p-8">{children}</main>
        {/* Footer d'administration */}
        <footer>
        <p className="sm text-center text-red-950">Encart publicitaire</p>
        <div className={`${styles.adflex}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
