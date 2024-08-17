import React, { memo } from 'react';
import { isEmpty } from 'lodash';
import SliderDesktop from './sliders/SliderDesktop';
import SliderSamsung from './sliders/SliderSamsung';
import SliderIphone from './sliders/SliderIphone';
import SliderIpad from './sliders/SliderIpad';
import Exauster from '@/components/Exauster';
import { CustomSession, Movie } from '@/lib/types';
import useWindowSize from '@/hooks/useWindowSize';

interface MovieListProps {
    data: Movie[];
    session?: CustomSession;
    title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, session, title }) => {
    const windowSize = useWindowSize();

    if (isEmpty(data)) {
        console.log("data est vide dans movieList");
        return null;
    }

    const limitedData = Array.isArray(data) ? data.slice(0, 12) : [];

    const renderSlider = () => {
        if (!windowSize.width) return null;

        if (windowSize.width < 768) {
            return <SliderIphone data={limitedData} />;
        } else if (windowSize.width < 1024) {
            return <SliderIpad data={limitedData} />;
        } else {
            return <SliderDesktop data={limitedData} />;
        }
    };

    return (
        <div className={`movie-list px-4 py-8 pb-12 md:px-12 mt-4 space-y-8 relative overflow-visible 
        hover:overflow-visible hover:bg-opacity-30 hover:z-50
        hover:ring-offset-8 hover:ease-in duration-1000`}>
            <div className="flex flex-w w-full justify-between">
                <p className="text-white text-md md:text-2xl lg:text-2xl font-semibold mb-4 title-slide">
                    {title}
                </p>
                <Exauster genre={data && data.length > 0 ? data[0].genre : ''} />
            </div>
            {renderSlider()}
        </div>
    );
};

export default memo(MovieList);
