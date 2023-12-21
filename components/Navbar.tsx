import React, { useState, useCallback, useRef, useEffect } from 'react';
import NavbarItem from '@/components/NavbarItem';
import MobileMenu from '@/components/MobileMenu';
import AccountMenu from '@/components/AccountMenu';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    const accountMenuRef = useRef(null);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);

    // Gestionnaire d'événement pour fermer AccountMenu lors du clic en dehors
    const handleCloseAccountMenu = useCallback((e) => {
        if (
            accountMenuRef.current &&
            !accountMenuRef.current.contains(e.target)
        ) {
            setShowAccountMenu(false);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Nettoyez l'écouteur d'événement lorsque le composant est démonté
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Ajoutez un gestionnaire d'événement de clic à l'ensemble de la page
        document.addEventListener('mousedown', handleCloseAccountMenu);

        // Nettoyez l'écouteur d'événement lorsque le composant est démonté
        return () => {
            document.removeEventListener('mousedown', handleCloseAccountMenu);
        };
    }, [handleCloseAccountMenu]);

    return (
        <nav className="w-full fixed z-40">
            <div
                className={`
                    px-4 
                    md-:px-16 
                    py-6 
                    flex 
                    flex-row 
                    items-center
                    transition
                    duration-500 
                    ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
                `}
            >
                <img
                    className="h-8 lg:h-12"
                    src="/img/conspix/cpl-pink.png"
                    alt="conspixlogo"
                />

                <div
                    className="
                    flex-row 
                    ml-8 
                    gap-7 
                    hidden 
                    lg:flex
                    "
                >
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by languages" />
                    <NavbarItem
                        className="font-earl tracking-wider randomizer-damage"
                        label="Randomizer ! ! !"
                    />
                </div>

                <div
                    onClick={toggleMobileMenu}
                    className="
                    lg:hidden 
                    flex
                    flex-row
                    items-center 
                    gap-2 
                    ml-8 
                    cursor-pointer 
                    relative"
                >
                    <p className="text-white text-sm">Browse</p>

                    <BsChevronDown
                        className={`text-white transition ${
                            showMobileMenu ? '-rotate-180' : 'rotate-0'
                        }`}
                    />

                    <MobileMenu visible={showMobileMenu} />
                </div>

                {/* CONTAINER LOUPE, CLOCHE, et photo profil DE DROITE*/}
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BsBell />
                    </div>
                    {/*menu utilisateur*/}
                    <div
                        onClick={toggleAccountMenu}
                        className="flex flex-row items-center gap-2 cursor-pointer relative"
                    >
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img
                                src="/img/avatars-kings.png"
                                alt="avatar test"
                            />
                        </div>
                        <BsChevronDown
                            className={`text-white transition ${
                                showAccountMenu ? '-rotate-90' : 'rotate-0'
                            }`}
                        />
                        <div ref={accountMenuRef}>
                            <AccountMenu visible={showAccountMenu} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
