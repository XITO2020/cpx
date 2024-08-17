import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRouter } from 'next/router';
import * as THREE from 'three';

const SubwayModel: React.FC = () => {
  const { scene } = useGLTF('/models/subway.glb');
  const router = useRouter();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const handleStationClick = (stationLink: string) => {
    router.push(stationLink);
  };

  useEffect(() => {
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh && object.name.startsWith('Station_')) {
        object.userData = { link: `/station/${object.name}` };
      }
    });
  }, [scene]);

  useFrame(({ camera, gl }) => {
    const handleClick = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.current.setFromCamera(mouse.current, camera);

      const intersects = raycaster.current.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const intersected = intersects[0].object as THREE.Mesh;
        if (intersected.userData.link) {
          handleStationClick(intersected.userData.link);
        }
      }
    };

    gl.domElement.addEventListener('click', handleClick);
    return () => {
      gl.domElement.removeEventListener('click', handleClick);
    };
  });

  return <primitive object={scene} />;
};

const SubwayScene: React.FC = () => {
  return (
    <div style={{ height: '85vh', width: '100%' }}>
      <Canvas camera={{ position: [2, 2, 2], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={1} />
        <React.Suspense fallback={null}>
          <SubwayModel />
        </React.Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SubwayScene;
