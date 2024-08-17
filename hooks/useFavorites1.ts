import { useQueryClient } from 'react-query';
import axios from 'axios';

const useFavorites = () => {// J'Utilisais avant useSession pour obtenir la session
    const queryClient = useQueryClient();

    if (!sessionData) {
        // Gère le cas où la session est nulle
        console.error("Session data is null in useFavorites");
        return {toggleFavorite: async () => {} }; 
    }

    // Définit une fonction pour ajouter ou supprimer un favori
    const toggleFavorite = async (movieId: string) => {
        try {
            if (!sessionData || !sessionData.user) {
                throw new Error("User is not authenticated");
            }

            await axios.post('/api/favorite', { movieId });

            // Rafraîchiy les données en cache après l'ajout ou la suppression
            queryClient.invalidateQueries('favorites');
        } catch (error) {
            console.error("Error while updating favorites:", error);
        }
    };

    return {
        toggleFavorite,
        mutate:queryClient.invalidateQueries
    };
};

export default useFavorites;