import React, { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import NavbarItem from '@/components/NavbarItem';
import MobileMenu from '@/components/MobileMenu';
import AccountMenu from '@/components/AccountMenu';
import Languages from '@/components/Languages';
import useRandom from '@/hooks/useRandom';
import { BsChevronDown, BsBell } from 'react-icons/bs';
import Search from '@/components/Search';
import { CustomSession } from '@/lib/types';

const TOP_OFFSET = 66;

interface NavProps {
    session: CustomSession | null;
}

const Navbar: React.FC<NavProps> = ({ session }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const { data: randomMovie } = useRandom();
    const accountMenuRef = useRef<HTMLDivElement>(null);
    const languagesMenuRef = useRef<HTMLDivElement>(null);
    const user = session?.user || null;

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);

    const toggleLangMenu = useCallback(() => {
        setShowLangMenu((current) => !current);
    }, []);

    const handleCloseAccountMenu = useCallback((e: MouseEvent) => {
        if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node) && e.target !== accountMenuRef.current) {
            setShowAccountMenu(false);
        }
        e.stopPropagation();
    }, []);

    const handleCloseLangMenu = useCallback((e: MouseEvent) => {
        if (languagesMenuRef.current && !languagesMenuRef.current.contains(e.target as Node) && e.target !== languagesMenuRef.current) {
            setShowLangMenu(false);
        }
        e.stopPropagation();
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
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('mouseup', handleCloseLangMenu);
        return () => {
            document.removeEventListener('mouseup', handleCloseLangMenu);
        };
    }, [handleCloseLangMenu]);

    useEffect(() => {
        document.addEventListener('mouseup', handleCloseAccountMenu);
        return () => {
            document.removeEventListener('mouseup', handleCloseAccountMenu);
        };
    }, [handleCloseAccountMenu]);

    const handleRandomizerClick = useCallback(() => {
        if (randomMovie) {
            window.location.href = `/movie/${randomMovie.id}`;
        }
    }, [randomMovie]);

    return (
        <nav className="w-full fixed navbar">
            <div
                className={`
                    py-2
                    px-4
                    md:px-16
                    flex
                    flex-row
                    items-center
                    transition
                    duration-500
                    ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
                `}
            >
                <img
                    className="h-8 lg:h-10"
                    src="/img/conspix/cpl-pink.png"
                    alt="conspixlogo"
                />
                <div className="flex-row ml-8 gap-7 hidden lg:flex items-center h-full">
                    <Link href="/"><NavbarItem label="Home" /></Link>
                    <Link href="/series"><NavbarItem label="Series" /></Link>
                    <Link href="/films"><NavbarItem label="Films" /></Link>
                    <Link href="/new"><NavbarItem label="New" /></Link>
                    <Link href="/profiles"><NavbarItem label="Yours" /></Link>
                    <div onClick={toggleLangMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <NavbarItem label="Change Language" />
                        <div ref={languagesMenuRef} className="absolute top-full left-0">
                            <Languages visible={showLangMenu} onClose={e => toggleLangMenu} />
                        </div>
                    </div>
                    <div onClick={handleRandomizerClick} className="relative">
                        <NavbarItem className="font-earl tracking-wider randomizer-damage" label="Randomizer ! ! !" />
                        <img src="/img/conspix/sandia.png" alt="pasteque en soutien à Gaza" className="sandia" />
                    </div>
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`transition ${showMobileMenu ? '-rotate-180 bg-green-400 text-black rounded-full p-1' : 'rotate-0 text-white'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer flex">
                        <Search />
                        <BsBell />
                    </div>
                    <div className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div onClick={(e) => { toggleAccountMenu(); e.stopPropagation(); }} className="flex flex-row items-center gap-2">
                            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                                {user?.image ? (
                                    <img src={user.image} alt="profile mini image" />
                                ) : (
                                    <img src="/img/csp3.png" alt="avatar test" />
                                )}
                            </div>
                            <BsChevronDown className={`text-white transition ${showAccountMenu ? '-rotate-90' : 'rotate-0'}`} />
                        </div>
                        <div ref={accountMenuRef} onMouseDown={e => e.stopPropagation()}>
                            <AccountMenu visible={showAccountMenu} session={session} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
