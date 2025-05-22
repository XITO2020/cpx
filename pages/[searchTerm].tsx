import React from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { motion } from 'framer-motion';
import { authOptions } from './api/auth/[...nextauth]';
import { CustomSession, Movie, LinkedArticle, User } from '@/lib/types';
import Navbar from '@/components/Navbar';
import SearchResults from '@/components/search/SearchResults';
import useSearch from '@/hooks/useSearch';

interface SearchPageProps {
  session: CustomSession | null;
  initialResults?: {
    movies: Movie[];
    articles: LinkedArticle[];
    authors: User[];
  };
  searchTerm: string;
}

export default function SearchPage({ session, initialResults, searchTerm }: SearchPageProps) {
  const { data: results, isLoading, error } = useSearch(searchTerm, initialResults);

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
            Results for: <span className="text-rose-500">{searchTerm}</span>
          </h1>

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
              <p className="text-gray-400 text-lg">No results found</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const searchTerm = context.params?.searchTerm as string;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(searchTerm)}`
    );
    const initialResults = await response.json();

    return {
      props: {
        session,
        initialResults,
        searchTerm,
      },
    };
  } catch (error) {
    console.error('Search error:', error);
    return {
      props: {
        session,
        searchTerm,
      },
    };
  }
};