import React, { useState, useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
    visible?: boolean;
    onClose?: () => void; // Ajoutez une fonction onClose pour fermer le menu
}

const AccountMenu: React.FC<AccountMenuProps> = ({
    visible,
    onClose, // Prop pour fermer le menu
}) => {
    const { data } = useCurrentUser();
    const accountMenuRef = useRef(null);

    // Gestionnaire d'événement pour fermer AccountMenu lors du clic en dehors
    const handleClickOutside = (e: MouseEvent) => {
        if (
            accountMenuRef.current &&
            !accountMenuRef.current.contains(e.target as Node)
        ) {
            onClose && onClose(); // Appel de la fonction onClose pour fermer le menu
        }
    };

    useEffect(() => {
        // Ajoutez un gestionnaire d'événement de clic à l'ensemble de la page
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!visible) {
        return null;
    }

    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex" ref={accountMenuRef}>
            <div className="flex flex-col gap-3">
                <div className="px-3 flex flex-row gap-3 items-center w-full group">
                    <img className="w-8 rounded-md" src="/img/avatars-kings.png" alt="mini image du profil" />
                    <p className="px-5 text-white text-sm group-hover:bg-rose-500 rounded-md p-4">
                        👀 {data?.name}
                    </p>
                </div>
                <p className="px-20 text-white text-lg hover:bg-pink-600 rounded-md py-2">
                    Contact
                </p>
                <p className="px-20 text-white text-lg hover:bg-yellow-400 rounded-md py-2">
                    Premium
                </p>
                <p className="px-20 text-white text-lg hover:bg-emerald-950 hover:text-yellow-400 rounded-md py-2">
                    Subway
                </p>
                <hr className="bg-gray-600 border-0 h-px my-4 group" />
                <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:bg-violet-600 rounded-md mx-4 py-2">
                    Sign out from Conspix
                </div>
            </div>
        </div>
    );
};

export default AccountMenu;
