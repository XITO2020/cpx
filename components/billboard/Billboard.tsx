// Add to existing imports
import { useLocalizedContent } from '@/hooks/useLocalizedContent';

const Billboard: React.FC = () => {
  // Add to existing state
  const { localizedMovies } = useLocalizedContent();
  
  // Modify getRandomMovie function
  const getRandomMovie = (movies: Movie[]): Movie | undefined => {
    const availableMovies = localizedMovies.length > 0 ? localizedMovies : movies;
    if (!availableMovies.length) return undefined;
    const randomIndex = Math.floor(Math.random() * availableMovies.length);
    return availableMovies[randomIndex];
  };

  // Rest of the component remains the same
};