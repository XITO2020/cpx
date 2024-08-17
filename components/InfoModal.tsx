import React, {useCallback, useEffect, useState, useRef} from 'react';
import { AiOutlineClose} from 'react-icons/ai';

import PlayButton from './PlayButton';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';

interface InfoModalProps {
    visible?: boolean;
    onClose: any;
    index?: number;
};

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose, index}) => {
    const [isVisible, setIsVisible] = useState(!!visible)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {movieId} = useInfoModal();
    const {data = {} } = useMovie(movieId);

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            const videoHeight = videoRef.current.videoHeight;
            const videoWidth = videoRef.current.videoWidth;
            const aspectRatio = videoWidth / videoHeight;
            setIsOverflowing(aspectRatio < 0.5625); // 9:16 aspect ratio
        }
    }, [data?.videoUrl]);

    useEffect(()=>{
        setIsVisible(!!visible);
    }, [visible]);

    const handleClose = useCallback(() =>{
        setIsVisible(false);
        setTimeout(()=> {
            onClose();
        }, 300)
    }, [onClose]);

    if(!visible){
        return null
    }

    return (
        <div className={`
        z-100 transition duration-300
        ${isVisible ? 'scale-100 bg-opacity-80' : 'scale-0 bg-opacity-0'}  bg-black 
        flex justify-center items-center
        overflow-y-auto
        fixed inset-0
        `}>
            <div className="relative mx-auto max-w-xl max-h-[66vh] rounded-md min-w-[32vw]">
                <div className={`
                ${isVisible ? 'scale-100' : 'scale-0'} 
                transform duration-300
                relative flex-auto bg-zinc-900 rounded-md
                drop-shadow-md border-4 border-violet-600 border-opacity-40
                `}>
                    <div className={`relative ${isOverflowing ? 'w-1/2 h-[56.25%]' : 'w-full h-96'} mx-auto`}>
            <video 
                ref={videoRef}
                onLoadedMetadata={() => {
                    if (videoRef.current) {
                        setIsOverflowing(videoRef.current.videoWidth / videoRef.current.videoHeight < 0.5625);
                    }
                }}
                autoPlay 
                muted 
                loop 
                src={data?.videoUrl}
                poster={data?.thumbnailUrl}
                className="w-full h-full object-cover object-center brightness-[60%] z-auto"
            ></video> 
                        
                        <div onClick={handleClose}
                        className="cursor-pointer
                        absolute top-3 right-3 h-10 w-10 rounded-full bg-violet-600
                        bg-opacity-70 flex items-center justify-center border-2 border-rose-500
                        ">
                            <AiOutlineClose className="text-white" size={20} />
                        </div>   

                        <div className="absolute bottom-[10%] left-10">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                            {data?.title}
                            </p> 
                            <div className="flex flex-row gap-4 items-center">
                                <PlayButton movieId={data?.id} />
                                <FavoriteButton index={index} movieId={data?.id} />
                                <div className="h-52 w-80 rounded-lg bg-zinc-700 border-red-500 border-2 z-300 p-4 text-zinc-300 text-xl absolute top-20 left-64">
                                    <p>{data?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>  

                    <div className="px-12 py-4 max-h-[30vh]">
                        <p className="text-green-400 font-semibold text-lg">
                            New
                        </p>
                        <p className="text-white text-lg">
                            {data?.duration}
                        </p>
                        <p className="text-white text-lg">
                            {data?.genre}
                        </p>
                        <p className="text-white text-lg pb-2">
                            {data?.rating}
                        </p>
                        <p>
                            créé un champ best comment
                        </p>
                    </div>
                </div>   
            </div>     
        </div>
    )
}

export default InfoModal;