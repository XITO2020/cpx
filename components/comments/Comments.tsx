import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useComments from '@/hooks/useComments';
import LoadingSpinner from '../ui/LoadingSpinner';

interface CommentsProps {
  movieId: string;
  className?: string;
}

const Comments: React.FC<CommentsProps> = ({ movieId, className }) => {
  const { comments, isLoading, error, addComment } = useComments({ movieId });
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      await addComment(newComment);
      setNewComment('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full text-white ${className}`}>
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-zinc-800 text-white rounded-lg p-4 min-h-[100px]
                     focus:ring-2 focus:ring-rose-500 focus:outline-none
                     placeholder-gray-400 resize-none"
            disabled={isSubmitting}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting || !newComment.trim()}
            className="absolute bottom-4 right-4 bg-rose-600 text-white px-4 py-2
                     rounded-md hover:bg-rose-700 transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed"
          >
            {isSubmitting ? <LoadingSpinner /> : 'Post'}
          </motion.button>
        </div>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">
          Failed to load comments: {error.message}
        </div>
      ) : (
        <AnimatePresence>
          <motion.ul className="space-y-4">
            {comments.map((comment, index) => (
              <motion.li
                key={comment.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-800 rounded-lg p-4"
              >
                <div className="flex items-start gap-4">
                  {comment.user?.image && (
                    <img
                      src={comment.user.image}
                      alt={comment.user.name || 'User'}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-rose-500">
                        {comment.user?.name || 'Anonymous'}
                      </span>
                      <span className="text-sm text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Comments;