import React from 'react';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '@/components/arrows';
import MovieCard from '@/components/MovieCard';

interface SliderIphoneProps {
    data: Record<string, any>[];
}

const SliderIphone: React.FC<SliderIphoneProps> = ({ data }) => {
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        rows: 1 
    };

    return (
        <Slider {...settings}>
            {data.map((movie, index) => {
                if (movie.isPadding) {
                    return <div key="padding" style={{ width: '600px' }}></div>;
                }
                return <MovieCard key={movie.id} data={movie} index={index} />;
            })}
        </Slider>
    );
};

export default SliderIphone;
