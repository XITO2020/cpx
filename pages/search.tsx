import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/components/Navbar';

const SearchPage = () => {
    const router = useRouter();
    const { query } = router.query;
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/search', {
                    params: { query }
                });
                setResults(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setLoading(false);
            }
        };

        if (query) {
            fetchData();
        }
    }, [query]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <Navbar session={session} />
            <h1 className="text-white">Résultats de la recherche</h1>
            {results.movies && results.movies.length > 0 && (
                <div>
                    <h2>Films</h2>
                    <ul>
                        {results.movies.map((movie, index) => (
                            <li key={index}>{movie.title}</li>
                        ))}
                    </ul>
                </div>
            )}
            {results.articles && results.articles.length > 0 && (
                <div>
                    <h2>Articles</h2>
                    <ul>
                        {results.articles.map((article, index) => (
                            <li key={index}>{article.title}</li>
                        ))}
                    </ul>
                </div>
            )}
            {results.authors && results.authors.length > 0 && (
                <div>
                    <h2>Auteurs</h2>
                    <ul>
                        {results.authors.map((author, index) => (
                            <li key={index}>{author.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {!results.movies.length && !results.articles.length && !results.authors.length && (
                <p>Aucun résultat trouvé.</p>
            )}
        </div>
    );
}

export default SearchPage;
