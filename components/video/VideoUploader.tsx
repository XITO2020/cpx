import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useVideoUpload } from '@/hooks/useVideoUpload';

const VideoUploader: React.FC = () => {
  const { uploadVideo, isUploading, progress, error } = useVideoUpload();
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    tags: [],
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      await uploadVideo(file, metadata);
    } catch (error) {
      console.error('Upload error:', error);
    }
  }, [metadata, uploadVideo]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1,
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Video title"
            value={metadata.title}
            onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 rounded-lg bg-zinc-800 text-white"
          />
          
          <textarea
            placeholder="Video description"
            value={metadata.description}
            onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-3 rounded-lg bg-zinc-800 text-white h-32"
          />
        </div>

        <motion.div
          {...getRootProps()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
            ${isDragActive ? 'border-rose-500 bg-rose-500/10' : 'border-gray-600'}`}
        >
          <input {...getInputProps()} />
          <p className="text-white">
            {isDragActive
              ? 'Drop the video here'
              : 'Drag & drop a video, or click to select'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Maximum duration: 4 minutes
          </p>
        </motion.div>

        {isUploading && (
          <div className="w-full bg-zinc-800 rounded-full h-4">
            <div
              className="bg-rose-500 h-4 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};