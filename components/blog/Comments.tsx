import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from './Blog.module.scss';

interface CommentsProps {
  movieId?: string;
}

const Comments: React.FC<CommentsProps> = ({ movieId }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add comment submission logic here
  };

  return (
    <div className={styles.comments}>
      <h3 className={styles.commentsTitle}>Commentaires</h3>

      {session ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="w-full p-4 rounded-lg bg-zinc-800 text-white resize-none"
            rows={4}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-2 px-6 py-2 bg-rose-600 text-white rounded-lg"
          >
            Publier
          </motion.button>
        </form>
      ) : (
        <Link
          href="/auth"
          className="block text-center py-4 text-rose-500 hover:text-rose-400"
        >
          Connectez-vous pour commenter
        </Link>
      )}

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.commentsList}
        >
          <div className={styles.commentsItem}>
            <div className={styles.commentsItemHeader}>
              <img
                src="/img/avatars-kings.png"
                alt="Avatar"
                className={styles.commentsItemAvatar}
              />
              <div className={styles.commentsItemMeta}>
                <Link href="/auth" className="font-bold text-rose-500">
                  Utilisateur
                </Link>
                <p className="text-sm text-gray-400">Il y a 2 heures</p>
              </div>
            </div>
            <p className={styles.commentsItemContent}>
              Le meilleur film que j'ai vu aujourd'hui
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Comments;