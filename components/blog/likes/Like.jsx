"use client"
import {useState} from "react";
import { LinkedArticle } from '../../../lib/types';

const Like = () =>{
    const [likes, setLikes] = useState(0);
    return (
        <div className="likeglober">
            <button onClick={() => setLikes((likes) =>likes + 1)}>
                <p>💞Liké <span color="rebeccapurple">{likes}</span> fois!</p>
            </button>
        </div>
    );
};

export default Like;