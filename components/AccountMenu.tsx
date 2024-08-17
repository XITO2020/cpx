import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
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
    onClose, // Prop pour fermer le menu
    session, 
}) => {
    const { data: currentUser } = useCurrentUser();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const accountMenuRef = useRef(null);
    const router = useRouter();

    
    // Fonction pour gérer la déconnexion
    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };
       

    useEffect(() => {
        // Gestionnaire d'événement pour fermer AccountMenu lors du clic en dehors
        const handleClickOutside = (e: MouseEvent) => {
            const accountMenuElement = accountMenuRef.current as HTMLElement | null;
            if (accountMenuElement && !accountMenuElement.contains(e.target as Node)) {
                onClose && onClose(); // Appel de la fonction onClose pour fermer le menu
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose, accountMenuRef]);
    
    // Fonction pour gérer le clic sur le lien "Subway"
    const handleSubwayClick = () => {
        if (!currentUser) {
            return; // Ne rien faire si isLoading est vrai ou s'il y a une erreur
        }
        if (currentUser.premium == false) {
            setShowAuthModal(true); // Afficher le modal d'authentification si l'utilisateur n'est pas connecté
        } else {
            router.push('/subway'); // Rediriger vers la page "Subway"
        }
    };

    // Fonction pour gérer la confirmation de l'utilisateur dans le modal d'authentification
    const handleConfirmAuth = () => {
        router.push('/auth'); // Rediriger l'utilisateur vers la page d'authentification
        setShowAuthModal(false); // Cacher le modal d'authentification
    };

    // Fonction pour gérer l'annulation dans le modal d'authentification
    const handleCancelAuth = () => {
        setShowAuthModal(false); // Cacher le modal d'authentification
    };

    if (!visible) {
        return null;
    }

    const user = session?.user || currentUser;

    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex" ref={accountMenuRef}>
            <div className="flex flex-col gap-3">
                <div className="px-3 flex flex-row gap-3 items-center w-full group">
                    { user?.image ? (<img  src={user.image} alt="profile mini image" />)
                    : (<img src='/img/avatars-kings.png' className="w-8 rounded-md" alt="mini image du profil" />) } 
                    
                     {user ? ( <Link href="profiles" className="px-5 text-white text-sm rounded-md p-4 hover:bg-fuchsia-600 hover:text-bold">
                        {user.name} </Link>) : (<Link href="auth" className="px-8 w-full text-sm text-white hover:font-bold hover:bg-neutral-600 rounded-md py-4 hover:text-rose-500">👀Watch all now !</Link>)}
                </div>

                <Link href="contact">
                    <p className="px-20 text-white text-lg hover:bg-pink-600 rounded-md py-2">
                        Contact
                    </p>
                </Link>
                
                <Link href="premium">
                    <p className="px-20 text-white text-lg hover:text-slate-700 hover:font-semibold hover:bg-yellow-400 rounded-md py-2">
                        Premium
                    </p>
                </Link>
                
                <Link href="subway"> 
                    <p className="px-20 text-white text-lg hover:bg-emerald-950 hover:text-yellow-400 rounded-md py-2">
                        Subway
                    </p>
                </Link>
                {session && (
                <>
                    <hr className="bg-gray-600 border-0 h-px my-4 group" />
                    <div onClick={handleSignOut} className="px-3 text-center text-white text-sm hover:bg-violet-600 rounded-md mx-4 py-2">
                        Sign out from Conspix
                    </div>
                </>
                ) }
            </div>
        </div>
    );
};

export default AccountMenu;
