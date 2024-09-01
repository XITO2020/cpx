// Dans votre composant Search

import { useState, FormEvent } from "react"
import { useRouter } from "next/router"
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link'

export default function Search() {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Construire les paramètres de recherche
        const searchParams = new URLSearchParams();
        if (title) searchParams.append('title', title);
        if (year) searchParams.append('year', year);
        if (genre) searchParams.append('genre', genre);
        if (rating) searchParams.append('rating', rating);
        if (description) searchParams.append('description', description);

        // Naviguer vers la page de recherche avec les paramètres
        router.push(`/search?${searchParams.toString()}`);
    }

    return (
        <form className="w-50 flex justify-center md:justify-between" onSubmit={handleSubmit}>
            {/* Champ de recherche pour le titre */}
            <div className="relative">
                <input type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-rose-800 bg-white font-bold p-2 pl-8 w-80 text-sm rounded-md opacity-40 focus:outline-none"
                    placeholder="Titre du film"
                />
                <BsSearch className="absolute top-2 left-1 text-rose-800" />
            </div>

            {/* Ajoutez ici des champs supplémentaires pour l'année, le genre, la note, la description, etc. */}

            {/* Bouton de soumission */}
            <div className="tooltip">
                
                <button className="p-1 text-md rounded-xl bg-rose-700 ml-2 font-bold border-none outline-none">
                <Link href="/search">🐇</Link>
                </button>
                
                
                <span className="tooltiptext">Terrier = enfumoir!</span>
            </div>
        </form>
    )
}
