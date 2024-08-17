import React from 'react';
import { useRouter } from 'next/router';

interface ExausterProps {
    genre: string;
}

const Exauster: React.FC<ExausterProps> = ({ genre }) => {
    const router = useRouter();

    const handleOnClick = () => {
        router.push(`/toutVoir/${genre}`); // Remplacez 'path-to-genre-page' par le chemin correct vers la page de genre
    };

    return (
        <button onClick={handleOnClick} className="font-bebas font-extrabold hover:bg-neutral-800 text-rose-400 bold px-4 py-2
         rounded-sm opacity-40 hover:opacity-80 bg-neutral-600 hover:text-rose-600 hover:font-black
          uppercase hover:drop-shadow-lg">
            Tout voir concernant <span className="text-white">
                {genre}
            </span>
        </button>
    );
};

export default Exauster;
