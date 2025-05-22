import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import styles from '../styles/Admin.module.scss';

interface MovieFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  genres: string[];
  releaseDate: string;
}

const AddMovies: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<MovieFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload logic
    const file = acceptedFiles[0];
    if (file) {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          // Handle successful upload
        }
      }, 500);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  const onSubmit = async (data: MovieFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/movies/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to upload movie');
      
      reset();
      setPreviewImage('');
      setUploadProgress(0);
    } catch (error) {
      console.error('Movie upload error:', error);
    } finally {
      setIsSubmitting(false);
    }
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
            placeholder="Movie Title"
            className={`${styles.inputfield} ${styles.shadowrose} bg-zinc-800 hover:bg-zinc-700`}
          />

          <textarea
            {...register('description', { required: 'Description is required' })}
            placeholder="Movie Description"
            rows={3}
            className={`${styles.inputfield} ${styles.shadowindigo} bg-zinc-800 hover:bg-zinc-700`}
          />

          <input
            type="number"
            {...register('duration', { required: 'Duration is required' })}
            placeholder="Duration (minutes)"
            className={`${styles.inputfield} ${styles.shadowviolet} bg-zinc-800 hover:bg-zinc-700`}
          />
        </div>

        <div className="space-y-4">
          <input
            {...register('thumbnailUrl')}
            placeholder="Thumbnail URL"
            onChange={(e) => setPreviewImage(e.target.value)}
            className={`${styles.inputfield} ${styles.shadowteal} bg-zinc-800 hover:bg-zinc-700`}
          />

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
            type="date"
            {...register('releaseDate')}
            className={`${styles.inputfield} ${styles.shadowpurple} bg-zinc-800 hover:bg-zinc-700`}
          />
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}
      >
        <input {...getInputProps()} />
        <p className="text-center text-gray-400">
          {isDragActive
            ? 'Drop the video file here'
            : 'Drag & drop a video file, or click to select'}
        </p>
      </div>

      {uploadProgress > 0 && (
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-zinc-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-rose-500"
            />
          </div>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Uploading...' : 'Upload Movie'}
      </motion.button>
    </motion.form>
  );
};

export default AddMovies;