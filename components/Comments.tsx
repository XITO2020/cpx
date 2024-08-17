// components/Comments.js
import React, { useState } from 'react';
import useComments from '@/hooks/useComments';

interface CommentsProps {
    movieId: string;
    // Ajoutez d'autres props si nécessaire
}

const Comments: React.FC<CommentsProps> = ({ movieId }) => {
    const { comments, loading, error, postComment } = useComments(movieId);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postComment(newComment);
        setNewComment('');
    };

    return (
        <div className="w-full text-white font-semibold">
            <h3>Commentaires</h3>
            {loading && <p>Chargement des commentaires...</p>}
            {error && <p>Erreur lors du chargement des commentaires : {error.message}</p>}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire"
                />
                <button type="submit">Poster</button>
            </form>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
