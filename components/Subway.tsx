import React from 'react';
import { useMetro } from '@/hooks/useMetro';

const Subway = () => {
  const { lines } = useMetro();

  return (
    <div className="metro-map">
      {lines.map((line, index) => (
        <div key={index} className={`line ${line.color}`} style={{ clipPath: line.clipPath }}>
          <div className="end-circle"></div>
          {line.stations.map((station, stationIndex) => (
            <a key={stationIndex} className="station" href={station.link} target="_blank" rel="noopener noreferrer">
              {station.stationName}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Subway;
