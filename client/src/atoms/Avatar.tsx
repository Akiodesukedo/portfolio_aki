import { useGLTF } from "@react-three/drei"
import { useRef } from "react";
import * as THREE from "three";

const Avatar: React.FC = () => {
  const { scene } = useGLTF('/models/avatar.glb')
  const meshRef = useRef<THREE.Group>(null!);
  
  return (
    <primitive ref={meshRef} object={ scene }/>
  )
}

export default Avatar