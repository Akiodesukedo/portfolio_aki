import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

type FloatingObjProps = {
  url: string
  position: [number, number, number];
  floatSpeed?: number;
  floatAmount?: number;
  scale?: number
};

const FloatingObj: React.FC<FloatingObjProps> = ({ url, position, floatSpeed = 1.5, floatAmount = 0.2, scale = 1 }) => {
  const { scene } = useGLTF(url)
  const meshRef = useRef<THREE.Group>(null!);
  const [x, y, z] = position;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    meshRef.current.position.y = y + Math.sin(t * floatSpeed) * floatAmount ;
    // meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <primitive 
      ref={meshRef} 
      object={ scene } 
      position={[x, y, z]}
      scale={scale}
    />
  );
};

export default FloatingObj;