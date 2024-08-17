import React, { ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-full bg-green-800 text-3xl text-stone-300">
      {/* Navbar ou Header d'administration */}
      <header>Admin Header</header>
      {/* Contenu de la page */}
      <main className="p-8">{children}</main>
      {/* Footer d'administration */}
      <footer>Admin Footer</footer>
    </div>
  );
};

export default AdminLayout;
