import React from 'react';
import { useForm } from 'react-hook-form';

function AddLinkedArticleForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data : any) => {
    // Soumettre les données du formulaire à votre API ou traiter localement
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register('title', { required: 'Title is required' })} placeholder="Title" />
        {errors.title && <span>{errors.title.message as string}</span>}
      </div>
      <div>
        <label>Description</label>
        <textarea {...register('description', { required: 'Description is required' })} placeholder="Description" />
        {errors.description && <span>{errors.description.message as string}</span>}
      </div>
      <div>
        <label>User ID</label>
        <input {...register('userId', { required: 'User ID is required' })} placeholder="User ID" />
        {errors.userId && <span>{errors.userId.message as string}</span>}
      </div>
      <div>
        <label>Movie ID</label>
        <input {...register('movieId', { required: 'Movie ID is required' })} placeholder="Movie ID" />
        {errors.movieId && <span>{errors.movieId.message as string}</span>}
      </div>
      <div>
        <label>Date</label>
        <input {...register('date')} type="date" />
        {/* Vous pouvez ajouter une validation et un message d'erreur si nécessaire */}
      </div>
      <div>
        <label>User</label>
        <input {...register('user')} placeholder="User" />
        {/* Vous pouvez ajouter une validation et un message d'erreur si nécessaire */}
      </div>
      {/* Ajoutez d'autres champs si nécessaire */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddLinkedArticleForm;
