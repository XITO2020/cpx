import React from 'react';
import { motion } from 'framer-motion';
import { CustomSession } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';

interface AdvancedSearchFormProps {
  params: {
    query: string;
    categories: string[];
    sortBy: string;
    dateRange: string;
    userContent: boolean;
  };
  onSearch: (params: any) => void;
  session: CustomSession | null;
}

const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  params,
  onSearch,
  session
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Search Query</label>
          <input
            type="text"
            value={params.query}
            onChange={(e) => onSearch({ ...params, query: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg"
            placeholder="Enter keywords..."
          />
        </div>

        <div>
          <label className="block text-white mb-2">Sort By</label>
          <select
            value={params.sortBy}
            onChange={(e) => onSearch({ ...params, sortBy: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg"
          >
            <option value="rating">Highest Rated</option>
            <option value="views">Most Viewed</option>
            <option value="date">Most Recent</option>
            <option value="comments">Most Discussed</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-white mb-2">Categories</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={params.categories.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...params.categories, category]
                    : params.categories.filter(c => c !== category);
                  onSearch({ ...params, categories: newCategories });
                }}
                className="text-rose-500"
              />
              <span className="text-white">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Date Range</label>
          <select
            value={params.dateRange}
            onChange={(e) => onSearch({ ...params, dateRange: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg"
          >
            <option value="all">All Time</option>
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        {session && (
          <div className="flex items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={params.userContent}
                onChange={(e) => onSearch({ ...params, userContent: e.target.checked })}
                className="text-rose-500"
              />
              <span className="text-white">Show only my content</span>
            </label>
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
      >
        Search
      </motion.button>
    </form>
  );
};