import React from 'react';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import { AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

const Watch = () =>{
    const router = useRouter();
    const { movieId } = router.query;

    const { data } = useMovie(movieId as string);

    return (
        <div className="bg-black h-screen">
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
                <AiOutlineArrowLeft  className="text-white cursor-pointer" size={40} 
                onClick={()=>{router.push('/')}}
                />

                <p className="font-bold text-white text-1xl md:text-3xl font-toejam"
                ><span className="text-rose-500 font-light subway">
                Watching:
                </span>{data?.title}
                </p>
                
                <AiOutlineArrowRight className="text-white" size={40} />
            </nav>
            <video src={data?.videoUrl}
            className="w-full h-full"
            autoPlay controls>
            </video>
        </div>
    )
}

export default Watch;