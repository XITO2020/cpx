import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import SubwayModel from './SubwayModel';
import StationInfo from './StationInfo';

const SubwayScene: React.FC = () => {
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[85vh]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[2, 2, 2]} fov={75} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[0, 10, 0]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <React.Suspense fallback={null}>
          <SubwayModel onStationHover={setHoveredStation} />
        </React.Suspense>
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
      
      {hoveredStation && (
        <StationInfo 
          stationName={hoveredStation} 
          className="absolute top-4 left-4 bg-black/50 text-white p-4 rounded-lg"
        />
      )}
    </div>
  );
};

export default SubwayScene;