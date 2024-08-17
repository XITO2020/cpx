import React, { useEffect, useRef } from 'react';
import { BsCheck } from 'react-icons/bs';

interface LanguageMenuProps {
    visible?: boolean;
    onClose?: () => void;
    toggleLangMenu?: () => void;
}

const Languages: React.FC<LanguageMenuProps> = ({ visible, onClose, toggleLangMenu }) => {
    const langMenuRef:any = useRef(null);

    // Gestionnaire d'événement pour fermer langMenu lors du clic en dehors
    const handleClickOutside = (e: MouseEvent) => {
        if (
            langMenuRef.current &&
            !langMenuRef.current.contains(e.target as Node)
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
        <div
            onClick={toggleLangMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
        >
            <ul>
                <li className="flex justify-around items-center text-transparent hover:text-emerald-800"><img src="/img/flags/alg2.png" alt="drapeau" className="h-8 mb-2 opacity-40 hover:opacity-90" /><p className="text-white text-sm opacity-30 hover:opacity-90 active:text-rose-500"> Ar-rabbi</p><BsCheck className="text-3xl"/> </li>
                <li className="flex justify-around items-center text-transparent hover:text-emerald-500"><img src="/img/flags/jam2.png" alt="drapeau" className="h-8 mb-2 opacity-40 hover:opacity-90" /><p className="text-white text-sm opacity-30 hover:opacity-90 active:text-rose-500"> Angulo-delta</p> <BsCheck className="text-3xl"/> </li>
                <li className="flex justify-around items-center text-transparent hover:text-rose-400"><img src="/img/flags/mex2.png" alt="drapeau" className="h-8 mb-2 opacity-40 hover:opacity-90" /><p className="text-white text-sm opacity-30 hover:opacity-90 active:text-rose-500"> His span</p><BsCheck className="text-3xl"/> </li>
                <li className="flex justify-around items-center text-transparent hover:text-rose-500"><img src="/img/flags/ind2.png" alt="drapeau" className="h-8 mb-2 opacity-40 hover:opacity-90" /><p className="text-white text-sm opacity-30 hover:opacity-90 active:text-rose-500"> Hind-ourian</p><BsCheck className="text-3xl"/> </li>
                <li className="flex justify-around items-center text-transparent hover:text-fuchsia-600"><img src="/img/flags/ru2.png" alt="drapeau" className="h-8 mb-2 opacity-40 hover:opacity-90" /><p className="text-white text-sm opacity-30 hover:opacity-90 active:text-rose-500"> Russana</p><BsCheck className="text-3xl"/> </li>
                <li className="flex justify-around items-center text-transparent hover:text-violet-600"><img src="/img/flags/fr2.png" alt="drapeau" className="h-8 mb-2 opacity-40 hover:opacity-90" /><p className="text-white text-sm opacity-30 hover:opacity-90 active:text-rose-500"> Affarajchi</p><BsCheck className="text-3xl"/> </li>
                <li className="flex justify-around items-center text-transparent hover:text-yellow-400"><img src="/img/flags/ger2.png" alt="drapeau" className="h-8 mb-2 opacity-40 hover:opacity-90" /><p className="text-white text-sm opacity-30 hover:opacity-90 active:text-rose-500"> Jeramayana</p><BsCheck className="text-4xl"/> </li>
            </ul>
            <div ref={langMenuRef} className="absolute top-full left-0 mt-2">
                {/* Ici, vous pouvez ajouter le contenu de votre menu dérou lant pour les langues */}
            </div>
        </div>
    );
}

export default Languages;
