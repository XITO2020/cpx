import React, { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import { isEmpty } from 'lodash';
import Slider from 'react-slick';
import {NextArrow, PrevArrow} from '@/components/arrows';
import Exauster from '@/components/Exauster';

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
   
    if (isEmpty(data)) {
        return null;
    }

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        rows: 1 
      };
      const limitedData = data.slice(0, 12);
      const displayData = [...limitedData, { isExauster: true }, {isPadding: true}];

      return (
        <div className="px-4 md:px-12 mt-4 space-y-8 relative overflow-visible 
        hover:overflow-visible hover:bg-black hover:bg-opacity-90 hover:z-50
        hover:ring-offset-8 hover:ease-in duration-1000">
            <p className="text-white text-md md:text-2xl lg:text-2xl
             font-semibold mb-4
             title-slide">
                {title}
            </p>
            <Slider {...settings}>
                {displayData.map((movie, index) => {
                    if (movie.isExauster) {
                        return <Exauster data={data[0]} index={12} key="exauster" />;
                    }
                    if (movie.isPadding) {
                        return <div key="padding" style={{ width: '600px' }}></div>; // Assurez-vous que la largeur est la même que celle de vos diapositives
                    }
                    return <MovieCard key={movie.id} data={movie} index={index} />;
                })}
            </Slider>
        </div>
    );
};

export default MovieList;
