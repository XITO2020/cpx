import React from 'react'
import styles from "./ThumbArticle.module.css"
import { LinkedArticle } from '../../../lib/types';

const ThumbArticle = () => {
  return (
    <div className="bg-black rounded-md text-white p-6 m-4 flex flex-col items-center justify-evenly">
      <p>title</p>
      <img src="/img/csp3.png" className="styles.thumbnails_img" alt="" />
      <p>resume</p>
      <button>go to</button>
    </div>
  )
}

export default ThumbArticle
