import React, { useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import { getSession } from 'next-auth/react'; // Importez getSession

interface FavoriteButtonProps {
    movieId: string;
    index: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, index }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    // Utilisez useEffect pour obtenir la session dès que le composant est monté
    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            console.log('Session:', session);
        };
        fetchSession();
    }, []);

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        try {
            if (isFavorite) {
                await axios.delete('/api/favorite', { data: { movieId } });
            } else {
                await axios.post('/api/favorite', { movieId });
            }

            // Après avoir modifié les favoris, récupérez à nouveau les données de l'utilisateur
            mutate();

            mutateFavorites();
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API:", error);
        }
    }, [movieId, isFavorite, mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div
            onClick={toggleFavorites}
            className={`
        cursor-pointer
        group/item
        w-6 h-6
        lg:w-10 lg:h-10
        ${index % 5 === 0 ? 'border-yellow-400' :
                index % 5 === 1 ? 'border-emerald-600' :
                    index % 5 === 2 ? 'border-violet-600' :
                        index % 5 === 4 ? 'border-pink-600'
                            : 'border-pink-500'}
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-neutral-300
        `}
        >
            <Icon className="text-white" size={25} />
        </div>
    );
};

export default FavoriteButton;
