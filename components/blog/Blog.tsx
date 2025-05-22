import React from 'react';
import { motion } from 'framer-motion';
import { CustomSession, Movie, LinkedArticle } from '@/lib/types';
import MainArticle from './MainArticle';
import ThumbArticle from './ThumbArticle';
import Comments from './Comments';
import styles from './Blog.module.scss';

interface BlogProps {
  movie?: Movie;
  session: CustomSession | null;
  movies: Movie[] | null;
  article?: LinkedArticle;
  articles?: LinkedArticle[] | null;
  page: string;
}

const Blog: React.FC<BlogProps> = ({
  movie,
  session,
  movies,
  article,
  articles,
  page
}) => {
  const relatedArticles = articles?.filter((a) =>
    a.movie?.movieGenres?.some(
      (mg) => movie?.movieGenres?.some(
        (movieGenre) => mg.genre.name === movieGenre.genre.name
      )
    )
  ) || [];

  const defaultArticles = Array(4 - relatedArticles.length).fill(null);
  const allArticles = relatedArticles.concat(defaultArticles);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${styles.container} ${page === 'movieId' ? styles.containerDark : ''}`}
    >
      <header className="flex justify-between items-center h-16 px-12">
        <img 
          src="/img/conspix/popcorn.png" 
          alt="Decorative" 
          className="h-12 w-auto"
        />
        {movie?.title && (
          <h1 className="text-2xl font-bold text-rose-500">{movie.title}</h1>
        )}
        <h2 className="text-4xl font-subway text-white">Le Blog</h2>
      </header>

      <main className="mt-8">
        <MainArticle 
          article={articles?.[0]} 
          articles={articles} 
          movie={movie} 
        />

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-6">
            Articles connexes :
          </h2>
          <div className={styles.grid}>
            {allArticles.map((article, index) => (
              article ? (
                <ThumbArticle key={article.id} {...article} />
              ) : (
                <div 
                  key={`empty-${index}`} 
                  className="h-48 bg-zinc-800 rounded-lg animate-pulse"
                />
              )
            ))}
          </div>
        </section>

        <Comments movieId={movie?.id} />
      </main>
    </motion.div>
  );
};

export default Blog;