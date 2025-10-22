import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';

type FlyingTubeProps = {
  points: THREE.Vector3[];
  speed?: number;
};

export default function FlyingTubeScene({ points, speed = 0.05 }: FlyingTubeProps) {
  const { camera } = useThree();
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
  }, [points]);

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 300, 2, 32, false);
  }, [curve]);

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: 'white',
      side: THREE.BackSide,
      map: new THREE.TextureLoader().load('/spacepart2.jpg'),
    });
    if (mat.map) {
      mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
      mat.map.repeat.set(10, 10);
    }
    return mat;
  }, []);

  const meshRef = useRef<THREE.Mesh>(null);
  const [t, setT] = useState(0);

  useFrame((_, delta) => {
    const newT = (t + speed * delta) % 1;
    const pos = curve.getPointAt(newT);
    const tangent = curve.getTangentAt(newT);

    // Move camera to tube path
    camera.position.copy(pos);
    // Look ahead slightly for better orientation
    camera.lookAt(pos.clone().add(tangent));
    setT(newT);
  });

  return (
    <mesh geometry={geometry} material={material} ref={meshRef} />
  );
}
