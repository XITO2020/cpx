import React from 'react';
import { LinkedArticle } from '../../lib/types';

interface MainArticleProps {
  article: LinkedArticle;
}

const MainArticle: React.FC<MainArticleProps> = ({ article }) => {
  return (
    <div className="article">
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      {/* Afficher d'autres champs de l'article si nécessaire */}
    </div>
  )
}

export default MainArticle;