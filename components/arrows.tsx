export const NextArrow: React.FC<any> = (props: any) => {
    const { onClick } = props;
    return (
        <button 
            className="arrows absolute bg-rose-500 right-0 top-1/2 transform -translate-y-1/2 hover:bg-orange-400 bg-opacity-50 p-4 pb-6 sm:text-sm md:text-xl lg:text-2xl rounded-md"
            onClick={onClick}>
            →
        </button>
    );
}

export const PrevArrow: React.FC<any> = (props: any) => {
    const { onClick } = props;
    return (
        <button 
            className="arrows absolute bg-violet-600 left-0 top-1/2 transform -translate-y-1/2 hover:bg-yellow-400 bg-opacity-50 p-4 pb-6 sm:text-sm md:text-xl lg:text-2xl rounded-md"
            onClick={onClick}
        >
            ←
        </button>
    );
}
