import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../page.module.scss';

function AddMovieForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data : any) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('genre', data.genre);
    formData.append('author', data.author);
    formData.append('thumbnailUrl', data.thumbnailUrl);
    formData.append('description', data.description);
    formData.append('video', data.video[0]);

    try {
      const response = await fetch('/api/movies/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Vidéo envoyée avec succès');
      } else {
        console.error('Erreur lors de l\'envoi de la vidéo');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la vidéo', error);
    }
  };

  return (
    <form className="flex flex-col items-center bg-black p-8 mx-auto mt-8 mb-4 text-neutral-400 w-[50%] z-10" onSubmit={handleSubmit(onSubmit)}>
      <input className={`text-center bg-blue-950 hover:bg-blue-700 hover:text-black rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowblue} `} {...register('title', { required: 'Trouvez un titre à votre vidéo' })} placeholder="Titre de la video" />
      {errors.title && <span>{errors.title.message as string}</span>}
      <input className={`text-center bg-indigo-900 hover:bg-indigo-500 hover:text-black rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowindigo} `} {...register('videoUrl')} placeholder="Url de la video (optionnel)" />
      {errors.videoUrl && <span>{errors.videoUrl.message as string}</span>}
      <input className={`text-center bg-purple-950 hover:bg-purple-500 hover:text-black rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowpurple} `} {...register('genre')} placeholder="Genre (séléction de carégories)" />
      <input className={`text-center bg-pink-500 hover:bg-yellow-400 hover:text-black rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowyellow} `} {...register('author')} placeholder="nom de l'auteur ou du groupe producteur" />
      <input className={`text-center bg-rose-700 hover:bg-rose-400 hover:text-black rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowrose} `} {...register('thumbnailUrl')} placeholder="URL de l'image de couverture" />
      <textarea className={`text-center bg-red-900 hover:bg-red-500 hover:text-black rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowrose} `} {...register('description')} placeholder="Description de la vidéo" />
      <input type="file" className={`text-center bg-green-900 hover:bg-green-500 hover:text-black rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowgreen} `} {...register('video', { required: 'Veuillez sélectionner une vidéo' })} />
      {errors.video && <span>{errors.video.message as string}</span>}
      <button className="bg-neutral-800 text-rose-500 font-extrabold w-full rounded-md py-2 mt-5 mb-2 hover:bg-neutral-700 hover:outline-slate-600 hover:outline-double hover:text-rose-700" type="submit">Envoyez votre vidéo</button>
    </form>
  );
}

export default AddMovieForm;
