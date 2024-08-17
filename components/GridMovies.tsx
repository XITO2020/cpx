
import useFavorites, { UseFavoritesResponse } from '@/hooks/useFavorites';
import useInfoModal from '@/hooks/useInfoModal';
import InfoModal from '@/components/InfoModal';
import MovieCard from '@/components/MovieCard';
import useMovieList from "@/hooks/useMovieList";
import { Movie } from '@/lib/types'; 


// Assurez-vous que le chemin est correct
export default function GridMovies() {
    const { data: movies = [] } = useMovieList() as { data: Movie[] }; 
    const { data: favorites = [] }: UseFavoritesResponse = useFavorites();
    const { isOpen, closeModal } = useInfoModal(); 
  
    const filmMovies = movies?.filter(movie => movie.genre === "films");
  
    return (
      <>
        <div className="fond">
            <InfoModal visible={isOpen} onClose={closeModal} index={10} />
            <div className="movie-grid">
                <div className="rounded-sm bg-yellow-400 border-2 border-yellow-400">
                <iframe width="320" height="180" src="https://www.youtube.com/embed/RYX7G1pVXx8?si=A7xAg0boRb-8ZWDe" 
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">    
                 </iframe>
                </div>
                <div className="rounded-sm bg-yellow-400 border-2 border-orange-300">
                    <iframe width="320" height="180" src="https://www.youtube.com/embed/NUGxWraG5DU?si=u6gy95k387Em-SeK" 
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        >
                    </iframe>
                </div>
                <div className="rounded-sm bg-yellow-400 border-2 border-rose-300">
                <iframe width="320" height="180" src="https://www.youtube.com/embed/hC6XOmwVvU4?si=FGfMQaOoJ8Z-4qaP" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </div>
                <div className="rounded-sm bg-yellow-400 border-2 border-rose-400">
                <iframe width="320" height="180" src="https://www.youtube.com/embed/nb0AvAIp4bA?si=BAEvO9D3f-WPPyEH&amp;controls=0&amp;start=1908" title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                gyroscope; picture-in-picture; web-share" >
                </iframe>
                </div>
                <div className="rounded-sm bg-yellow-400 border-2 border-rose-500">
                <iframe
                    width="320" 
                    height="180" 
                    src="https://www.youtube.com/embed/0Z9yNHIolnM?si=cnKAEFspbT-Pd9bp&amp;controls=0" 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                    gyroscope; picture-in-picture;
                     web-share">
                        
                    </iframe>
                </div>
                <div className="rounded-sm bg-yellow-400 border-2 border-pink-600">
                <iframe 
                        width="320" 
                        height="180" 
                        src={`https://www.youtube.com/embed/ycFmDOvEtus`} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; 
                        encrypted-media; gyroscope; picture-in-picture">
                    </iframe>
                </div>
                <div className="rounded-sm bg-yellow-400 border-2 border-fuchsia-700">
                    <iframe width="320" height="180"
                    src="https://www.youtube.com/embed/r7WxqOaefS8?si=n26AQ7vt64y8d2ai" 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                    gyroscope; picture-in-picture; web-share">
                    </iframe>
                </div>
                <div className="rounded-sm bg-yellow-400 border-2 border-purple-600">
                
                </div>
                <div className="rounded-sm bg-yellow-400 border-2 border-purple-800">
                
                </div>
                
                <div className="iframe-container rounded-sm bg-yellow-400 border-2 border-yellow-500">
                    
                </div>
                <div className="iframe-container rounded-sm bg-yellow-400 border-2 border-purple-600">
                    
                </div>
                <div className="iframe-container rounded-sm bg-yellow-400 border-2 border-purple-500">
                    
                </div>
                <div className="iframe-container rounded-sm bg-yellow-400 border-2 border-pink-700">
                    
                </div>
                <div className="rounded-sm bg-yellow-400 border-2 border-pink-500">
                    
                </div>
                <div className="iframe-container rounded-sm bg-yellow-400 border-2 border-orange-300">
                    
                </div>
                <div className="iframe-container rounded-sm bg-yellow-400 border-2 border-rose-600">
                <iframe 
                        width="320" 
                        height="180" 
                        src="https://www.youtube.com/watch?v=nb0AvAIp4bA"
                        title="YouTube video player" 
                        
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        >
                    </iframe>
                </div>
                <div className="iframe-container rounded-sm bg-yellow-400 border-2 border-fuchsia-700">
                
                </div>
            


                <div className="movie-grid">
                    {filmMovies?.map((movie, index) => (
                    <div key={movie.id}>
                        <MovieCard data={movie} index={index} />
                    </div>
                ))}
                </div>
            </div>
        </div>
      </>
    )
  }
  