import React from 'react';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '@/components/arrows';
import MovieCard from '@/components/MovieCard';
import useWindowSize from '@/hooks/useWindowSize';

interface SliderDesktopProps {
    data: Record<string, any>[];
}

const SliderDesktop: React.FC<SliderDesktopProps> = ({ data }) => {
    const { width } = useWindowSize();

    const getSlidesToShow = () => {
        if (width < 768) {
            return 1;
        } else if (width < 1024) {
            return 2;
        } else {
            return 4;
        }
    };

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: getSlidesToShow(),
        slidesToScroll: getSlidesToShow(),
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        rows: 1 
    };

    return (
        <Slider {...settings}>
            {data.map((movie, index) => {
                if (movie.isPadding) {
                    return <div key="padding" style={{ width: '600px'}}></div>;
                }
                return <MovieCard key={movie.id} data={movie} index={index} />;
            })}
        </Slider>
    );
};

export default SliderDesktop;
