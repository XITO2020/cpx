import React from 'react';
import useMovie from '@/hooks/useMovie';
import { Movie } from "@/lib/types";

interface MovieProps {
  genre: string;
}


const CategoryGrid: React.FC<MovieProps> = ({ genre }) => {
    // Récupérer les films correspondant au genre spécifié
    const { data, error, isLoading } = useMovie();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data || data.length === 0) {
        return <div>No movies available for this genre.</div>;
    }

    // Filtrer les films par genre
    const genreMovies = data.filter((movie: Movie) => movie.genre === genre);

    return (
        <div className="grid grid-cols-3 gap-4">
            {genreMovies.map((movie:Movie) => (
                <div key={movie.id} className="border p-4">
                    <img src={movie.thumbnailUrl} alt={movie.title} className="w-full h-48 object-cover mb-2" />
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <p className="text-sm text-gray-500">Year: {movie.year}</p>
                    <p className="text-sm text-gray-500">Duration: {movie.duration}</p>
                    <p className="text-sm text-gray-500">Rating: {movie.rating}</p>
                </div>
            ))}
        </div>
    );
};

export default CategoryGrid;
