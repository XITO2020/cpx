import styles from "./mainArticle.module.scss"
import { LinkedArticle, Movie } from '../../../lib/types';
import useMovie from "@/hooks/useMovie";
import { useState } from "react";
import Link from "next/link";


interface ArticleProps {
  article: LinkedArticle | undefined;
  articles: LinkedArticle[] | undefined;
  movie: Movie | undefined;
}

const MainArticle: React.FC<ArticleProps> = ({movie, article, articles}) => {
  const [currentMovieId, setCurrentMovieId] = useState<string | undefined>();
  const { data, error, isLoading } = useMovie(currentMovieId);
  return (
    <div className={styles.container}>
      <section className="flex justify-between w-full">
        <div className="">
          <p>Author :</p>
          <p>{article?.user.name}</p>
        </div>
        <div className="">
          <p>Catégorie: </p>
          <Link href="/">{movie?.genre} </Link>
          <p>rating</p>
          <p></p>
        </div>
      </section>
      
      <div className="blog_image bg-stone-400">
        <img src={article?.imageOne} className="great_img" alt="" />
      </div>

      <div className="bg-amber-500 content">
        {article?.description}
      </div>

      <div className="labeledmemes">
        
      </div>
      
    </div>
  )
}

export default MainArticle
