import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import styles from '../styles/Admin.module.scss';

interface ArticleFormData {
  title: string;
  description: string;
  content: string;
  thumbnailUrl: string;
  tags: string[];
  movieId?: string;
}

const AddArticles: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ArticleFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const onSubmit = async (data: ArticleFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/articles/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create article');
      
      reset();
      setPreviewImage('');
      // Show success notification
    } catch (error) {
      console.error('Article creation error:', error);
      // Show error notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagePreview = (url: string) => {
    setPreviewImage(url);
  };

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <input
            {...register('title', { required: 'Title is required' })}
            placeholder="Article Title"
            className={`${styles.inputfield} ${styles.shadowrose} bg-zinc-800 hover:bg-zinc-700`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <input
            {...register('thumbnailUrl')}
            placeholder="Thumbnail URL"
            onChange={(e) => handleImagePreview(e.target.value)}
            className={`${styles.inputfield} ${styles.shadowindigo} bg-zinc-800 hover:bg-zinc-700`}
          />

          <textarea
            {...register('description', { required: 'Description is required' })}
            placeholder="Short Description"
            rows={3}
            className={`${styles.inputfield} ${styles.shadowviolet} bg-zinc-800 hover:bg-zinc-700`}
          />
        </div>

        <div className="space-y-4">
          {previewImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <input
            {...register('tags')}
            placeholder="Tags (comma separated)"
            className={`${styles.inputfield} ${styles.shadowteal} bg-zinc-800 hover:bg-zinc-700`}
          />

          <input
            {...register('movieId')}
            placeholder="Related Movie ID (optional)"
            className={`${styles.inputfield} ${styles.shadowpurple} bg-zinc-800 hover:bg-zinc-700`}
          />
        </div>
      </div>

      <textarea
        {...register('content', { required: 'Content is required' })}
        placeholder="Article Content (Markdown supported)"
        rows={10}
        className={`${styles.inputfield} ${styles.shadowfuchsia} bg-zinc-800 hover:bg-zinc-700 w-full`}
      />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Publishing...' : 'Publish Article'}
      </motion.button>
    </motion.form>
  );
};

export default AddArticles;