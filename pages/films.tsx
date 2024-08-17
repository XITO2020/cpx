import Navbar from '@/components/Navbar';
import React, {useState, useEffect} from "react";
import GridMovies from "@/components/GridMovies";
import Billboard from "@/components/Billboard";

export default function series () {
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        if (isMuted) {
            const timer = setTimeout(() => {
                setIsMuted(false);
            }, 10000); // Délai de 2 secondes

            return () => clearTimeout(timer); // Nettoyez le timer si le composant est démonté
        }
    }, [isMuted]);
    return (
        <>
            <Navbar />
            <section className="cinema">
                <h1>film</h1>
                <div id="mainscreen">
                    <iframe 
                        width="800" 
                        height="600" 
                        src={`https://www.youtube.com/embed/ycFmDOvEtus?autoplay=1${isMuted ? "&mute=1" : ""}`} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        >
                    </iframe>
                </div>
                
            </section>
            <GridMovies />
            <Billboard />
        </>
    )
}
