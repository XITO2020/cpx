import React from 'react';
import Randomizer from './Randomizer';

interface MobileMenuProps {
    visible?: boolean
}

const MobileMenu : React.FC<MobileMenuProps> = ({ visible }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-4">
                <div className="px-3 text-center text-white hover:bg-emerald-950 rounded-md p-2">
                    Home
                </div>
                <div className="px-3 text-center text-white hover:bg-fuchsia-800 rounded-md p-2">
                    Series
                </div>
                <div className="px-3 text-center text-white hover:bg-pink-600 rounded-md p-2">
                    Films
                </div>
                <div className="px-3 text-center text-white hover:bg-emerald-700 hover:text-yellow-400 hover:font-bold rounded-md p-2">
                    New & Popular
                </div>
                <div className="px-3 text-center text-white hover:bg-rose-500 rounded-md p-2">
                    My List
                </div>
                <div className="px-3 text-center text-white hover:bg-fuchsia-500 rounded-md p-2">
                    Browse by langage
                </div>
                <div className="px-3 text-center text-pink-400 hover:bg-violet-600 hover:text-white rounded-md p-2 font-toejam">
                <Randomizer />
                     <img src="/img/conspix/sandia.png" alt="pasteque en soutien à Gaza" className="sandia-mobile" />
                </div>
            </div>
        </div>
    )
};

export default MobileMenu;