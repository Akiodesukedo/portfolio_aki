import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

const Avatar: React.FC = () => {
  const { scene } = useGLTF('/models/avatar.glb')
  const meshRef = useRef<Mesh>(null!);

  // useFrame((_, delta) => {
  //   meshRef.current.rotation.y += delta / 4;
  // });
  
  return (
    <primitive ref={meshRef} object={ scene }/>
  )
}

export default Avatar