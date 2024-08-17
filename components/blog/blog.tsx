import React from 'react';
import styles from "./blog.module.css";
import MainArticle from './article/MainArticle';
import ThumbArticle from './thumbArticle/ThumbArticle';
import Comments from './Comments';
import { CustomSession, Movie, LinkedArticle } from '@/lib/types';
import Image from 'next/image';

interface BlogProps {
  movie: Movie | undefined;
  session: CustomSession | null;
  movies: Movie[] | null;
  articles: LinkedArticle[] | null;
}

const Blog: React.FC<BlogProps> = ({ movie, session, movies, articles }) => {

  return (
    <div className={styles.container}>
      <div className="flex justify-between px-12 items-center h-16">
        <Image src="/img/conspix/popcorn.png" alt="image d'habillage" height={100} width={200} />
        <h1 className="text-red-500 text-bold text-2xl">
          {movie?.title}
        </h1>
        <h2 className="text-4xl text-stone-100 text-extrabold subway white">Le Blog</h2>
      </div>
      
      
      <section className="main">
            <MainArticle articles={articles} movie={movie} />
      </section>
      <section className="related">
        <h2 className="subway mx-auto mt-8 text-xl text-white">Autres articles en lien avec le sujet :</h2>
            <div className="rowarticles flex justify-evenly">
                {articles?.map(article =>  (
                <ThumbArticle key={article.id} />
                ))}
                <ThumbArticle />               
                <ThumbArticle />               
                <ThumbArticle />               
                <ThumbArticle />               
            </div>

      </section>
      <section className={styles.comments}>

      </section>
    </div>
  )
}


export default Blog
