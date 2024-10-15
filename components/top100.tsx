import React, { useEffect, useState } from 'react';
import { Movie } from '@/lib/types';

// Fonction pour calculer le score de chaque film selon les critères
const calculateScores = (movies: Movie[]) => {
  return movies.map(movie => ({
    ...movie,
    scoreByRating: movie.rating,
    scoreByFavorites: movie.favoriteLength,
    scoreByViews: movie.views,
  }));
};

const Top100: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [top100Movies, setTop100Movies] = useState<Movie[]>([]);
  const [criteria, setCriteria] = useState<'rating' | 'favorites' | 'views'>('rating');
  const [verificationLevelFilter, setVerificationLevelFilter] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies/index');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des films', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      // Calculer les scores de chaque film
      const scoredMovies = calculateScores(movies);

      // Filtrer les films selon le verificationLevel
      const filteredMovies = verificationLevelFilter
        ? scoredMovies.filter(movie => movie.verificationLevel === 7)
        : scoredMovies;

      // Trier les films selon le critère sélectionné
      const sortedMovies = filteredMovies.sort((a, b) => {
        if (criteria === 'rating') {
          return b.scoreByRating - a.scoreByRating;
        } else if (criteria === 'favorites') {
          return b.scoreByFavorites - a.scoreByFavorites;
        } else {
          return b.scoreByViews - a.scoreByViews;
        }
      });

      // Sélectionner les 100 meilleurs films
      const top100 = sortedMovies.slice(0, 100);

      setTop100Movies(top100);
    }
  }, [movies, criteria, verificationLevelFilter]);

  return (
    <div className="w-[70%] mx-auto pt-40 mt-5">
      <h1>Top 100 Films</h1>
      <div className="flex justify-between w-[50%]">
        <label className="p-7 bg-pink-600 rounded-lg">
          <input
            type="radio"
            value="rating"
            checked={criteria === 'rating'}
            onChange={() => setCriteria('rating')}
          />
          Mieux notés
        </label>
        <label className="p-7 bg-purple-600 rounded-lg">
          <input
            type="radio"
            value="favorites"
            checked={criteria === 'favorites'}
            onChange={() => setCriteria('favorites')}
          />
          Plus mis en favoris
        </label>
        <label className="p-7 bg-yellow-400 rounded-lg">
          <input
            type="radio"
            value="views"
            checked={criteria === 'views'}
            onChange={() => setCriteria('views')}
          />
          Plus vus
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={verificationLevelFilter}
            onChange={() => setVerificationLevelFilter(!verificationLevelFilter)}
          />
          Filtrer uniquement les films au niveau de certification maximum
        </label>
      </div>
      <ul className="flex jsutify-evenly width-[80%]">
        {top100Movies.map(movie => (
          <li key={movie.id}>
            <div>
                <h2>{movie.title}</h2>
                <p>{movie.thumbnailUrl}</p>
                <p>Rating: {movie.rating}</p>
                <p>Votes: {movie.favoriteLength}</p>
                <p>Views: {movie.views}</p>
            </div>
            <div>
                <p>{movie.description}</p>
                <p>{movie.author}</p>
                <p></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Top100;
