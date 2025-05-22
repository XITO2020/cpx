import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import styles from './Blog.module.scss';

const Like: React.FC = () => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLike}
      className={styles.likeButton}
      disabled={hasLiked}
    >
      <motion.span
        animate={hasLiked ? { scale: [1, 1.5, 1] } : {}}
        className={styles.likeButtonIcon}
      >
        <FaHeart className={hasLiked ? 'text-rose-600' : 'text-gray-400'} />
      </motion.span>
      <span className={styles.likeButtonCount}>
        {likes} {likes === 1 ? 'like' : 'likes'}
      </span>
    </motion.button>
  );
};

export default Like;