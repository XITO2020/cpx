// hooks/useComments.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useComments = (movieId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/comments?movieId=${movieId}`);
                setComments(response.data.comments);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        if (movieId) {
            fetchComments();
        }
    }, [movieId]);

    const postComment = async (commentText) => {
        try {
            const response = await axios.post('/api/comments', { description: commentText, movieId });
            setComments([...comments, response.data]);
        } catch (err) {
            setError(err);
        }
    };

    return { comments, loading, error, postComment };
};

export default useComments;
