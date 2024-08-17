import React from 'react';
import MainArticle from './article/mainArticle-backup';
import ThumbArticle from './thumbArticle/ThumbArticle';
import Comments from './Comments';
import { LinkedArticle } from '../../lib/types';

interface BlogProps {
  movieId: string | undefined;
  linkedArticles: LinkedArticle[];
}

const Blog: React.FC<BlogProps> = ({ movieId, linkedArticles }) => {
  return (
    <div className="container">
      <section className="main">
        {linkedArticles.map(article => (
          <MainArticle key={article.id} article={article} />
        ))}
      </section>
      <section className="related">
        <div className="rowarticles flex justify-evenly">
          {linkedArticles.map(article => (
            <ThumbArticle key={article.id} article={article} />
          ))}
        </div>
      </section>
      <section className="comments">
        <Comments linkedArticles={linkedArticles} /> 
      </section>
    </div>
  )
}

export default Blog;
//il faut passer {article} en prop de Comments, MainArticle et de thumbArticle 