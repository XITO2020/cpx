import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRouter } from 'next/router';
import * as THREE from 'three';
import { useStationStore } from '@/stores/stationStore';

interface SubwayModelProps {
  onStationHover?: (stationName: string | null) => void;
}

const SubwayModel: React.FC<SubwayModelProps> = ({ onStationHover }) => {
  const { scene } = useGLTF('/models/subway.glb');
  const router = useRouter();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const hoveredStation = useRef<THREE.Object3D | null>(null);
  const { setActiveStation } = useStationStore();

  const handleStationClick = (stationName: string) => {
    setActiveStation(stationName);
    router.push(`/station/${stationName}`);
  };

  useEffect(() => {
    // Set up interactive stations
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh && object.name.startsWith('Station_')) {
        object.userData = { 
          isStation: true,
          originalColor: (object as THREE.Mesh).material.color.clone(),
          link: `/station/${object.name}` 
        };
      }
    });

    return () => {
      // Cleanup
      if (hoveredStation.current) {
        const mesh = hoveredStation.current as THREE.Mesh;
        mesh.material.color.copy(mesh.userData.originalColor);
      }
    };
  }, [scene]);

  useFrame(({ camera, gl, clock }) => {
    // Handle mouse interactions
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.current.setFromCamera(mouse.current, camera);

      const intersects = raycaster.current.intersectObjects(scene.children, true);
      
      // Reset previous hover state
      if (hoveredStation.current) {
        const mesh = hoveredStation.current as THREE.Mesh;
        mesh.material.color.copy(mesh.userData.originalColor);
        hoveredStation.current = null;
        onStationHover?.(null);
      }

      // Set new hover state
      if (intersects.length > 0) {
        const intersected = intersects[0].object as THREE.Mesh;
        if (intersected.userData.isStation) {
          hoveredStation.current = intersected;
          intersected.material.color.setHex(0xff0000); // Highlight color
          onStationHover?.(intersected.name);
        }
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (hoveredStation.current) {
        handleStationClick(hoveredStation.current.name);
      }
    };

    // Add event listeners
    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('click', handleClick);
    };
  });

  return <primitive object={scene} />;
};

export default SubwayModel;