import React from 'react';
import { useRouter } from 'next/router';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import useCurrentUser from '@/hooks/useCurrentUser';

interface MovieCardProps {
    data: Record<string, any>;
    index:number;
}

const MovieCard : React.FC<MovieCardProps> = ({
    data, index, ...props
}) =>{
    const { data: currentUser } = useCurrentUser();
    const router = useRouter();
    const {openModal} = useInfoModal();

    console.log("Session in MovieCard:", currentUser);

    return (
        <div {...props} className="overflow-hidden hover:overflow-visible filmroll group w-[30vw] border-zinc-900 border-4 border-opacity-90 col-span relative h-[16vw] w- hover:rounded-2xl bg-opacity-40">
            <img src={data.thumbnailUrl} alt="thumbnailUrl" 
            className="cursor-pointer object-cover transition rounded-md duration shadow-xl
            group-hover:opacity-90 sm:group-hover:opacity-0 dealy-300 w-full h-[16vw]
            "
            />
                <div className="opacity-0
                absolute
                top-0
                transition
                duration-200
                z-10
                invisible
                sm:visible
                delay-100
                w-full
                scale-0
                group-hover:scale-110
                group-hover:translate-y-[16px]
                group-hover:translate-x-[8px]
                group-hover:opacity-100">
                <img src={data.thumbnailUrl} alt="thumbnail" 
                className="
                cursor-pointer 
                object-cover
                transition 
                duration 
                shadow-xl 
                rounded-t-md 
                w-full 
                h-[12vw]
                "/>
                <div className="z-10
                bg-zinc-900
                p-2
                lg:p-4
                absolute
                w-full
                tansition
                shadow-md
                rounded-b-md
                ">
                    <div className="flex flex-row items-center gap-3">

                        <div onClick={() =>{router.push(`/watch/${data?.id}`)}}
                        className={`cursor-pointer w-6 h-6 lg:w-10 lg:h-10 text-white 
                        ${index % 5 === 0 ? 'bg-yellow-300' :
                        index % 5 === 1 ? 'bg-emerald-800' :
                            index % 5 === 2 ? 'bg-violet-800' :
                                index % 5 === 4 ? 'bg-fuchsia-600'
                                    : 'bg-pink-500'}
                        rounded-full flex justify-center items-center transition hover:bg-opacity-50`}>
                            <BsFillPlayFill size={30}/>
                        </div>

                        <FavoriteButton movieId={data?.id} index={index} />

                        <div onClick={() =>{openModal(data?.id) }}
                            className="cursor-pointer ml-auto group/item
                            w-6 h-6 lg:h-10 lg:w-10 border-white rounded-full
                            border-2 flex justify-center transition
                            items-center hover:border-neutral-300">
                            <BiChevronDown className="text-white group-hover/item:text-rose-500" size={40} />
                        </div>

                </div>
                <p className="text-green-400 font-semibold mt-4">
                    New <span className="text-white">2023</span>
                </p>
                <div className="flex flex-row mt-4 gap-2 items-center">
                    <p className="text-white text-[-10px] lg-text-sm">{data.duration}</p>    
                </div> 
                <div className="flex flex-row mt-4 gap-2 items-center">
                    <p className="text-rose-500 text-[-10px] lg-text-sm">{data.genre}</p>    
                </div> 
            </div>    
            </div>
        </div>
    )
}

export default MovieCard;