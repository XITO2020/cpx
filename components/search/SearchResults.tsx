import React from 'react';
import Link from 'next/link';
import { Movie, LinkedArticle, User } from '@/lib/types';

interface SearchResultsProps {
  results: {
    movies: Movie[];
    articles: LinkedArticle[];
    authors: User[];
  };
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const { movies, articles, authors } = results;

  return (
    <div className="space-y-8">
      {/* Movies Section */}
      {movies.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <Link 
                key={movie.id}
                href={`/watch/${movie.id}`}
                className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition duration-300"
              >
                <div className="aspect-video relative">
                  {movie.thumbnailUrl && (
                    <img
                      src={movie.thumbnailUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold truncate">{movie.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">{movie.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Articles Section */}
      {articles.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.id}`}
                className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition"
              >
                <h3 className="text-white font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3">{article.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Authors Section */}
      {authors.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Content Creators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/profile/${author.id}`}
                className="bg-zinc-900 p-4 rounded-lg text-center hover:bg-zinc-800 transition"
              >
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                  <img
                    src={author.image || '/default-avatar.png'}
                    alt={author.name || 'Author'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white font-semibold">{author.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {!movies.length && !articles.length && !authors.length && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No results found</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;