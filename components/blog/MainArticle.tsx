import React from 'react';
import { motion } from 'framer-motion';
import { Movie, LinkedArticle } from '@/lib/types';
import Like from './Like';

interface MainArticleProps {
  article?: LinkedArticle;
  articles?: LinkedArticle[] | null;
  movie?: Movie;
}

const MainArticle: React.FC<MainArticleProps> = ({
  article,
  articles,
  movie
}) => {
  if (!article) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 rounded-lg overflow-hidden shadow-xl"
    >
      <div className="relative aspect-video">
        <img
          src={article.imageOne}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-white mb-4"
        >
          {article.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <p className="text-gray-300">{article.description}</p>
        </motion.div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {article.user?.image && (
              <img
                src={article.user.image}
                alt={article.user.name || 'Author'}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <p className="text-white font-semibold">
                {article.user?.name || 'Anonymous'}
              </p>
              <p className="text-gray-400 text-sm">
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Like />
        </div>
      </div>
    </motion.article>
  );
};

export default MainArticle;