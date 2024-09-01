import Link from 'next/link'
import React from 'react'
import { LinkedArticle } from '../../../lib/types';

const Comments = () => {
  return (
    <div className="stripe-card">
            <div className="stars"></div>
            
            <div className="stripe-container">
               <div className="avatar">
                  <img src="/" alt="photo de user" />
               </div>
               <p>le meilleur film que j'ai vu aujourd'hui</p>
            </div>

            <Link href="/auth">nom de user</Link>
          </div>
  )
}

export default Comments
