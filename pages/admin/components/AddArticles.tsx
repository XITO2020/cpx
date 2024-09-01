import React from 'react';
import { useForm } from 'react-hook-form';
import styles from "../page.module.scss"
import Image from 'next/image';

function AddLinkedArticleForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data : any) => {
    // Soumettre les données du formulaire à votre API ou traiter localement
    console.log(data);
  };

  return (
  <>
    <div className={`opacity-80 ${styles.design}`}>
            <Image className="z-10" src="/img/snookerballs.png" alt="snooker balls" width={300} height={300} />
    </div>

    <form className="bg-black p-8 mx-auto mt-8 mb-4 text-neutral-400 w-[50%] z-100" onSubmit={handleSubmit(onSubmit)}>
      <div className="min-w-full flex justify-center">
        
      <input className={`text-center bg-violet-950 hover:bg-violet-600 hover:text-black rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowviolet} `}  {...register('title', { required: 'Mettez un titre, svp' })} placeholder="Titre de l'article" />
        {errors.title && <span>{errors.title.message as string}</span>}
      </div>
      <div className="w-full flex justify-center">
        <textarea className={`bg-fuchsia-900 hover:bg-fuchsia-600 hover:text-black rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowfuchsia}`}  {...register('description', { required: 'Manque votre article !' })} placeholder="Copiez ici le contenu de l'article" />
        {errors.description && <span>{errors.description.message as string}</span>}
      </div>
      <div className="w-full flex justify-center">
        <input className={`text-center bg-yellow-500 hover:bg-yellow-200 hover:text-neutral-700 rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowyellow} `} {...register('userId', { required: 'Le nom de l\'auteur est requis ' })} placeholder="Ecrivez le nom de l'auteur" />
        {errors.userId && <span>{errors.userId.message as string}</span>}
      </div>

      <div className="w-full flex justify-center">
        <input className={`text-center bg-rose-700 hover:bg-rose-500 hover:text-black rounded-md ${styles.placeholderDark} ${styles.inputfield} ${styles.shadowrose} `} {...register('movieId', { required: 'Copiez le titre de la vidéo à l\'identique' })} placeholder="Copiez le titre exact du film en rapport" />
        {errors.movieId && <span>{errors.movieId.message as string}</span>}
      </div>
      {/* Ajoutez d'autres champs si nécessaire */}
      <button className="bg-neutral-800 text-rose-500 font-extrabold w-full rounded-md py-2 mt-5 mb-2 hover:bg-neutral-700 hover:outline-slate-600 hover:outline-double hover:text-rose-700" type="submit">Postez votre article</button>
    </form>
  </>
  );
}

export default AddLinkedArticleForm;
