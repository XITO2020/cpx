import React from 'react';
import { Movie } from '@/lib/types';

type FavoritesProps = {
  movies: Movie[];
};

const Favorites: React.FC<FavoritesProps> = ({ movies }) => {
  return (
    <div className="favorites-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="favorite-item">
          <img src={movie.thumbnailUrl} alt={movie.title} className="favorite-thumbnail" />
          <p className="favorite-title">{movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
