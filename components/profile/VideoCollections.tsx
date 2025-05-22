import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Movie } from '@/lib/types';
import MovieCard from '../movie/MovieCard';

interface VideoCollectionsProps {
  movies: Movie[];
  systemCategories: string[];
  sortOptions: { id: string; label: string; }[];
}

const VideoCollections: React.FC<VideoCollectionsProps> = ({
  movies,
  systemCategories,
  sortOptions
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = movies?.filter(movie => {
    if (selectedCategory === 'all') return true;
    return movie.category === selectedCategory;
  }).filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMovies = [...(filteredMovies || [])].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'views':
        return b.views - a.views;
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search collections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="all">All Categories</option>
          {systemCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMovies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MovieCard data={movie} index={index} />
          </motion.div>
        ))}
      </div>

      {sortedMovies.length === 0 && (
        <p className="text-center text-gray-400 py-12">
          No videos found in this collection.
        </p>
      )}
    </div>
  );
};

export default VideoCollections;