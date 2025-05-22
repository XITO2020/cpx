import React from 'react';
import { motion } from 'framer-motion';
import { LinkedArticle } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface RelatedArticlesProps {
  articles: LinkedArticle[];
  categories: string[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  articles,
  categories
}) => {
  // Filter articles by matching categories and sort by date
  const relatedArticles = articles
    .filter(article => 
      article.categories.some(cat => categories.includes(cat))
    )
    .sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedArticles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ArticleCard article={article} />
        </motion.div>
      ))}

      {relatedArticles.length === 0 && (
        <p className="col-span-full text-center text-gray-400 py-4">
          No related articles found
        </p>
      )}
    </div>
  );
};