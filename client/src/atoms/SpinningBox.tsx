import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
// We need this type definition because I'm using TypeScript
import { useControls } from "leva";

// 🚨 This is a React component that will render a 3D cube mesh (object) inside the scene (here Canvas React Component includes the scene)
const SpinningBox = () => {
  const boxRef = useRef<Mesh>(null!);
  // No rerendering everytime Mesh (3D object) Object updates.
  // But keep track of the latest version of Mesh by making a reference here so Canvas can render the 3D object continuously without re-rendering the entire page.
  const { color, speed } = useControls({
    color: "blue",
    speed: {
      value: 0.005,
      min: 0,
      max: 0.03,
      step: 0.001
    }
  })

  // Runs on every frame (~60fps)
  useFrame(() => {
    boxRef.current.rotation.y += speed; // Spin the cube continuously
    boxRef.current.rotation.x += speed;
  });
  // _ (First param) is the "state" object like camera, clocks, etc. I'm not using any of those now. So just name it "_"
  // And "delta" means "Time passed since the last frame". This makes animation consistent even on slower computer.

  return (
    <mesh ref={boxRef}>
    {/* 
      This is a React Three Fiber <mesh> component
      Under the hood, it creates a Three.js THREE.Mesh
      Now the actual mesh instance is attached to the boxRef.current reference
    */}
      <axesHelper args={[3]}/>
      <boxGeometry args={[1, 1.5, 2]} />
      {/*
        BoxGeometry creates a cube/recutangular prism. 
        args are [width, height, depth] 
      */}
      <meshStandardMaterial color={ color } />
      {/* Material = the skin/paint of the object. */}
    </mesh>
  );
}

export default SpinningBox