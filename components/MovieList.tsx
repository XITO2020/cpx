import React, { useRef, useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import { isEmpty } from 'lodash';


interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const MovieList: React.FC<MovieListProps> = ({data, title}) => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [isMounted, setIsMounted] = useState(false);

    const [animationDelay, setAnimationDelay] = useState<number>(0);
    
useEffect(() => {
    // Générer un délai aléatoire entre 1 et 10 secondes
    const randomDelay = Math.floor(Math.random() * 10) + 1;
    setAnimationDelay(randomDelay);
}, []);


    useEffect(() => {
        setIsMounted(true);
    }, []);

    console.log(data);


    const scrollLeft = () => {
        const container = scrollContainerRef.current;
        if (container && container instanceof HTMLElement) {
            container.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    }
    
    const scrollRight = () => {
        const container = scrollContainerRef.current;
        if (container && container instanceof HTMLElement) {
            container.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    }
    

    if(isEmpty(data)){
        return null;
    }
    
    return (
        <div className="px-4 md:px-12 mt-4 space-y-8 relative">
            <div>
                <p className="text-white text-md md:text-2xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                {isMounted && (
                    <>
                        <button className="z-20 absolute hover:bg-rose-500 left-0 top-1/2 transform -translate-y-1/2 bg-gray-400 bg-opacity-50 p-2 rounded-r" onClick={scrollLeft}>←</button>
                        <button className="z-20 absolute hover:bg-violet-600 right-0 top-1/2 transform -translate-y-1/2 bg-gray-400 bg-opacity-50 p-2 rounded-l" onClick={scrollRight}>→</button>
                    </>
                )}
                <div className="md:ml-0 lg:ml-0 slider" style={{ width: 'calc(40 * 30vw)' }} ref={scrollContainerRef}>
                    {data.map((movie, index) => (
                <MovieCard key={movie.id} data={movie} index={index} />
                 ))}
                </div>

            </div>
        </div>
    );
}

export default MovieList;
