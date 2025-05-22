import { useState } from 'react';
import { useSession } from 'next-auth/react';

const MAX_VIDEOS = 12;
const MAX_DURATION = 240; // 4 minutes in seconds

export const useVideoUpload = () => {
  const { data: session } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const checkUploadEligibility = async () => {
    const response = await fetch('/api/user/upload-slots');
    const { uploadedVideos, isPremium } = await response.json();

    if (!isPremium) {
      throw new Error('Premium subscription required to upload videos');
    }

    if (uploadedVideos >= MAX_VIDEOS) {
      throw new Error('Maximum video upload limit reached');
    }
  };

  const validateVideo = (file: File) => {
    const video = document.createElement('video');
    return new Promise((resolve, reject) => {
      video.onloadedmetadata = () => {
        if (video.duration > MAX_DURATION) {
          reject(new Error('Video duration exceeds 4 minutes'));
        }
        resolve(true);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const uploadVideo = async (file: File, metadata: any) => {
    try {
      setIsUploading(true);
      setError(null);

      await checkUploadEligibility();
      await validateVideo(file);

      const formData = new FormData();
      formData.append('video', file);
      formData.append('metadata', JSON.stringify(metadata));

      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      throw err;
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return {
    uploadVideo,
    isUploading,
    progress,
    error,
  };
};