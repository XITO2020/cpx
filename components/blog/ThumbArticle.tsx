import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LinkedArticle } from '@/lib/types';
import styles from './Blog.module.scss';

const ThumbArticle: React.FC<LinkedArticle> = ({
  id,
  title,
  description,
  imageOne,
  user,
  createdAt
}) => {
  return (
    <motion.article
      whileHover={{ scale: 1.05 }}
      className={styles.article}
    >
      <Link href={`/article/${id}`}>
        <img
          src={imageOne}
          alt={title}
          className={styles.articleImage}
        />
        <div className={styles.articleContent}>
          <h3 className={styles.articleTitle}>{title}</h3>
          <p className={styles.articleExcerpt}>
            {description.length > 100
              ? `${description.substring(0, 100)}...`
              : description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {user?.image && (
                <img
                  src={user.image}
                  alt={user.name || 'Author'}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span className="text-sm text-gray-500">
                {user?.name || 'Anonymous'}
              </span>
            </div>
            <span className="text-sm text-gray-400">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ThumbArticle;