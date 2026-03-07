import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type FloatingShapeProps = {
  position: [number, number, number];
  floatSpeed?: number;
  floatAmount?: number;
};

const FloatingShape: React.FC<FloatingShapeProps> = ({ position, floatSpeed = 1.5, floatAmount = 0.2 }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [x, y, z] = position;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    meshRef.current.position.y = y + Math.sin(t * floatSpeed) * floatAmount;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={[x, y, z]}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default FloatingShape;