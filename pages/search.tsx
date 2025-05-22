import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { CustomSession, Movie, LinkedArticle, User } from '@/lib/types';
import { authOptions } from './api/auth/[...nextauth]';
import { useSearch } from '@/hooks/useSearch';
import Navbar from '@/components/Navbar';
import SearchResults from '@/components/search/SearchResults';
import LoadingSpinner from '@/components/LoadingSpinner';

interface SearchPageProps {
  session: CustomSession | null;
}

interface SearchResults {
  movies: Movie[];
  articles: LinkedArticle[];
  authors: User[];
}

const SearchPage: React.FC<SearchPageProps> = ({ session }) => {
  const router = useRouter();
  const { query } = router.query;
  const { data: results, isLoading, error } = useSearch(query as string);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar session={session} />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar session={session} />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  const hasResults = results && (
    results.movies?.length > 0 || 
    results.articles?.length > 0 || 
    results.authors?.length > 0
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar session={session} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">
          Search Results for: {query}
        </h1>

        {hasResults ? (
          <SearchResults results={results as SearchResults} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No results found for your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session
    }
  };
};

export default SearchPage;