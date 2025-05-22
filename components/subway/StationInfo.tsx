import React from 'react';
import { useStationInfo } from '@/hooks/useStationInfo';

interface StationInfoProps {
  stationName: string;
  className?: string;
}

const StationInfo: React.FC<StationInfoProps> = ({ stationName, className }) => {
  const { station, isLoading } = useStationInfo(stationName);

  if (isLoading || !station) {
    return null;
  }

  return (
    <div className={className}>
      <h3 className="text-lg font-bold mb-2">{station.name}</h3>
      {station.description && (
        <p className="text-sm text-gray-300">{station.description}</p>
      )}
      <div className="mt-2 text-sm">
        <p>Line: {station.line}</p>
        {station.connections?.length > 0 && (
          <p>Connections: {station.connections.join(', ')}</p>
        )}
      </div>
    </div>
  );
};

export default StationInfo;