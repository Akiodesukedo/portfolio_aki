import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

type FloatingObjProps = {
  url: string
  floatSpeed?: number;
  floatAmount?: number;
  orbitRadius?: number
  orbitSpeed?: number
  startAngle?: number
  scale?: number
};

const FloatingObj: React.FC<FloatingObjProps> = ({ url, floatSpeed = 1.5, floatAmount = 0.2, scale = 1, orbitRadius = 2, orbitSpeed = .5, startAngle = 0 }) => {
  const { scene } = useGLTF(url)
  const meshRef = useRef<THREE.Group>(null!);
  const [x, y, z] = [0, 0, 0];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    meshRef.current.position.x = Math.cos(t * orbitSpeed + startAngle) * orbitRadius
    meshRef.current.position.z = Math.sin(t * orbitSpeed + startAngle) * orbitRadius

    meshRef.current.position.y = y + Math.sin(t * floatSpeed) * floatAmount ;

    // meshRef.current.rotation.y += 0.01;
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