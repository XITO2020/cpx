import {memo} from 'react';
import { useRouter } from 'next/router';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import useCurrentUser from '@/hooks/useCurrentUser';

interface MovieCardProps {
    data: Record<string, any>;
    index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, index, ...props }) => {
    console.log('Données de film reçues par le composant MovieCard :', data);
    const { data: currentUser } = useCurrentUser();
    const router = useRouter();
    const { openModal } = useInfoModal();

    const movieYear = data?.year ? parseInt(data.year) : null;

    let displayText = "";
    let displayColor = "gray";
    if(movieYear){
        if (movieYear === 2023 || movieYear === 2024) {
            displayText = "New  ";
            displayColor = "text-green-400";
        } else if (movieYear < 2023) {
            displayColor="text-gray-400"
            displayText = "Année:   ";
        } else {
            displayText = "Out timed   ";
            displayColor = "text-crimson";
        }
    }

    return (
        <div {...props} className="movie-card hover:overflow-visible filmroll 
        group lg:w-[300px] lg:h-[16vw] sm:h-full sm:w-[90vw] rounded-lg border-opacity-40
         col-span relative bg-opacity-40 hover:border-rose-600 border-2">
            <img src={data.thumbnailUrl} alt="thumbnailUrl" 
            className=" cursor-pointer object-cover transition rounded-md duration
             shadow-xl hover:opacity-90 sm:group-hover:opacity-0 w-full h-[16vw]"/>
            <div className="opacity-0
                absolute
                top-4
                left-5
                transition
                duration-200
                z-10
                hover:z-40
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
                rounded-md 
                w-full 
                lg:h-[12vw] md:h-[16vw] sm:h-[24vw]
                hover:z-20!
               
                "/>
                <div className="z-50
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

                        <p className="text-neutral-500 max-w-6xl">{data.title}</p>

                        <div onClick={() =>{openModal(data?.id) }}
                            className="cursor-pointer ml-auto group/item
                            w-6 h-6 lg:h-10 lg:w-10 outline outline-2 rounded-full
                            flex justify-center transition
                            items-center hover:border-neutral-300">
                            <BiChevronDown className="rounded-full text-white  bg-zinc-900 group-hover/item:text-green-400" size={40} />
                        </div>
                    </div>
                    <p className={`font-semibold mt-4 ${displayColor} `} >
                        {displayText} <span className="text-white">{movieYear}</span>
                    </p>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[-10px] lg-text-sm">{data.duration}</p>    
                    </div> 
                    <div className="w-full flex flex-row mt-4 gap-2 items-center justify-between">
                        <p className="text-purple-700 text-[-10px] lg-text-sm">{data.views}<span className="text-white"> vues</span></p>    
                        <p className="text-fuchsia-500 text-[-10px] lg-text-sm">{data.rating}<span className="text-white"> /10</span></p>    
                    </div> 
                </div>    
            </div>
        </div>
    )
}

export default memo(MovieCard);