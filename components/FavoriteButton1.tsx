"use client"

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSessionContext } from '@/contexts/sessionContext';
import useFavorites from '@/hooks/useFavorites';
import { User } from '@/lib/types';

interface FavoriteButtonProps {
    movieId: string;
    index: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, index }) => {
    const {toggleFavorite} = useFavorites();
    const  session  = useSessionContext();
    const { mutate: mutateFavorites } = useFavorites();
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
    const [sessionLoaded, setSessionLoaded] = useState(false);

    useEffect(() => {
        if (!sessionLoaded || !currentUser) {
            const fetchSession = async () => {
                if (session && 'user' in session) {
                    const sessionUser = session.user as User;
                    setCurrentUser(sessionUser);
                }

                setSessionLoaded(true);
            };
            fetchSession();
        }
    }, [session, sessionLoaded, currentUser]);

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response;
        try {
            if (isFavorite) {
                response = await axios.delete('/api/favorite', { data: { movieId } });
            } else {
                response = await axios.post('/api/favorite', { movieId });
            }
            const updatedFavoriteIds = response?.data?.favoriteIds;

            if (currentUser) {
                setCurrentUser({
                    ...currentUser,
                    favoriteIds: updatedFavoriteIds,
                });
            }

            if (mutateFavorites) {
                mutateFavorites();
            }
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API:", error);
        }
    }, [movieId, isFavorite, currentUser, mutateFavorites]);
    console.log(isFavorite)
    return (
        <div
            onClick={ (e)=>{
                e.preventDefault(); 
                toggleFavorites();
            }}
            className={`
                cursor-pointer
                group/item
                w-6 h-6
                lg:w-10 lg:h-10
                ${
                    index % 5 === 0
                        ? 'border-yellow-400'
                        : index % 5 === 1
                        ? 'border-emerald-600'
                        : index % 5 === 2
                        ? 'border-violet-600'
                        : index % 5 === 4
                        ? 'border-pink-600'
                        : 'border-pink-500'
                }
                border-2
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:border-red-500
            `}
        >
            <AiOutlinePlus className="text-white hover:border-red-500" size={25} />
        </div>
    );
};

export default FavoriteButton;
