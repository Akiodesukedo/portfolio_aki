import { useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react"
import { SpotLight, SpotLightHelper } from "three";

const SpotLightWithHelper:React.FC = () => {
  const lightRef = useRef<SpotLight>(null!);

  const { angle, penumbra } = useControls({
    angle: {
      value: 0.6,
      min: 0.05,
      max: 1.00,
      step: 0.05
    },
    penumbra: {
      value: 0.0,
      min: 0.0,
      max: 1.0,
      step: 0.1
    }
  })

  useHelper(lightRef, SpotLightHelper, 'orange')

  return (
    <spotLight 
      ref={lightRef} 
      penumbra={penumbra}
      angle={angle}
      intensity={100} 
      color={0xffea00} 
      position={[2, 5, 1]} 
      castShadow
    />
  )
}

export default SpotLightWithHelper