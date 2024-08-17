import React from 'react';
import { useForm } from 'react-hook-form';

function AddMovieForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data : any) => {
    // Soumettre les données du formulaire à votre API ou traiter localement
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title', { required: 'Title is required' })} placeholder="Title" />
      {errors.title && <span>{errors.title.message as string}</span>}
      <input {...register('videoUrl', { required: 'Video URL is required' })} placeholder="Video URL" />
      {errors.videoUrl && <span>{errors.videoUrl.message as string}</span>}
      <input {...register('genre')} placeholder="Genre" />
      <input {...register('language')} placeholder="Language" />
      <input {...register('author')} placeholder="Author" />
      <input {...register('thumbnailUrl')} placeholder="Thumbnail URL" />
      <input {...register('duration')} placeholder="Duration" />
      <input {...register('year')} placeholder="Year" type="number" />
      <input {...register('rating')} placeholder="Rating" type="number" step="0.1" />
      <textarea {...register('description')} placeholder="Description" />
      {/* Ajoutez d'autres champs si nécessaire */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddMovieForm;
