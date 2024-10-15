import React from 'react';
import styles from './blog.module.css';
import MainArticle from './article/MainArticle';
import ThumbArticle from './thumbArticle/ThumbArticle';
import Comments from './comments/Comments';
import { CustomSession, Movie, LinkedArticle } from '@/lib/types';
import Image from 'next/image';

interface BlogProps {
  movie: Movie | undefined;
  session: CustomSession | null;
  movies: Movie[] | null;
  article: LinkedArticle | undefined;
  articles: LinkedArticle[] | undefined | null;
  page: string;
}

const Blog: React.FC<BlogProps> = ({ movie, session, movies, article, articles, page }) => {
  const relatedArticles = articles
  ? articles.filter((article) =>
      article.movie &&
      article.movie.movieGenres &&
      article.movie.movieGenres.some(
        (movieGenre) => movie && movie.movieGenres && movieGenre.genre.name === movie.movieGenres[0].genre.name
      )
    )
  : [];


  const defaultArticles = Array(4 - relatedArticles.length).fill(null);

  const allArticles = relatedArticles.concat(defaultArticles);

  return (
    <div className={`${page === 'movieId' ? `${styles.tapisvert} ${styles.container}` : `${styles.tapiscyan}`}`}>
      <div className="flex justify-between px-12 items-center h-16">
        <Image src="/img/conspix/popcorn.png" alt="image d'habillage" height={100} width={200} />
        <h1 className="text-red-500 text-bold text-2xl">{movie?.title}</h1>
        <h2 className="text-4xl text-extrabold subway white">Le Blog</h2>
      </div>

      <section className="main font-impacted2">
        <MainArticle article={articles ? articles[0] : undefined} articles={articles} movie={movie} />
      </section>

      <section className="related">
        <h2 className="font-evogria mx-auto mt-8 text-xl text-white">
          Autres articles en lien avec le sujet :
        </h2>
        <div className="rowarticles flex justify-evenly">
  {allArticles.map((article, index) =>
    article ? (
      <ThumbArticle key={article.id} {...article} />
    ) : (
      <ThumbArticle key={index} />
    )
  )}
</div>

        <Comments />
      </section>

      <section className={styles.comments}></section>
    </div>
  );
};

export default Blog;
