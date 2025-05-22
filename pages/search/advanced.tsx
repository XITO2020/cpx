import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { motion } from 'framer-motion';
import { authOptions } from '../api/auth/[...nextauth]';
import { CustomSession } from '@/lib/types';
import Navbar from '@/components/Navbar';
import AdvancedSearchForm from '@/components/search/AdvancedSearchForm';
import SearchResults from '@/components/search/SearchResults';
import useAdvancedSearch from '@/hooks/useAdvancedSearch';

interface AdvancedSearchProps {
  session: CustomSession | null;
}

export default function AdvancedSearch({ session }: AdvancedSearchProps) {
  const [searchParams, setSearchParams] = useState({
    query: '',
    categories: [],
    sortBy: 'rating',
    dateRange: 'all',
    userContent: false,
  });

  const { results, isLoading, error } = useAdvancedSearch(searchParams);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar session={session} />
      
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-white mb-8">
            Advanced Search
          </h1>

          <AdvancedSearchForm 
            params={searchParams}
            onSearch={setSearchParams}
            session={session}
          />

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">
                Error loading results: {error.message}
              </p>
            </div>
          ) : results ? (
            <SearchResults results={results} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Use the form above to start your search
              </p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}