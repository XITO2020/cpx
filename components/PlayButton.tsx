import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import {useRouter} from 'next/router';

interface PlayButtonProps {
    movieId : string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId}) =>{
    const router = useRouter();

    return (
        <button 
        onClick={() => router.push(`/watch/${movieId}`)}
        className=" bg-neutral-600 text-rose-500 rounded-md py-1 md:py-2 px-2 md:px-4 
        w-auto text-xs lg:text-lg font-bold flex flex-row items-center hover:text-black hover:bg-neutral-300 transition
        ">
        <BsFillPlayFill size={25} className="mr-1" />    
        Play            
        </button>
    )
};

export default PlayButton;