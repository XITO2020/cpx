import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useRouter } from 'next/router';
import * as THREE from 'three';

const SubwayModel: React.FC = () => {
  const { scene } = useGLTF('/models/subway.glb');
  const router = useRouter();

  useEffect(() => {
    const handleStationClick = (event: PointerEvent) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Assurez-vous que l'événement a une caméra associée
      const camera = event.currentTarget as unknown as THREE.Camera;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const intersected = intersects[0].object as THREE.Mesh;
        if (intersected.userData.link) {
          router.push(intersected.userData.link);
        }
      }
    };

    const stations: THREE.Object3D[] = [];
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh && object.name.startsWith('Station_')) {
        object.userData = { link: `/station/${object.name}` };
        stations.push(object);
      }
    });

    // Assurez-vous d'utiliser les bonnes signatures pour les écouteurs d'événements
    const handleClick = (event: THREE.Event) => handleStationClick(event as unknown as PointerEvent);

    stations.forEach((station) => {
      (station as THREE.Object3D).addEventListener('pointerdown', handleClick as unknown as EventListener);
    });

    return () => {
      stations.forEach((station) => {
        (station as THREE.Object3D).removeEventListener('pointerdown', handleClick as unknown as EventListener);
      });
    };
  }, [scene, router]);

  return <primitive object={scene} />;
};

export default SubwayModel;
