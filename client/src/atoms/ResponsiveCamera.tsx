import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from "three";

const ResponsiveCamera: React.FC = () => {
  const { camera, size } = useThree()

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    if (size.width < 640) {
      camera.fov = 65
      camera.position.set(0, 1.4, 4.8)
    } else if (size.width < 1040) {
      camera.fov = 50
      camera.position.set(0, 1.4, 4.2)
    } else {
      camera.fov = 40
      camera.position.set(0, 1.4, 3.5)
    }

    camera.updateProjectionMatrix()
  }, [camera, size.width])

  return null
}

export default ResponsiveCamera