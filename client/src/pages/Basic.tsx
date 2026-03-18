import { Canvas } from "@react-three/fiber";
import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";
import { CameraControls, Environment, GizmoHelper, GizmoViewport, PerspectiveCamera } from "@react-three/drei";
import SpinningBox from "../atoms/SpinningBox";
import Sphere from "../atoms/Sphere";
import Knot from "../atoms/Knot";
import SpotLightWithHelper from "../atoms/SpotLightWithHelper";
import BigRectToCastShadow from "../atoms/BigRectToCastShadow";

const Basic = () => {
  const {isOpen, setIsOpen} = useMenu();

  return (
    <div style={{ height: "100vh" }}>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)} />
      <Header WebsiteName="Aki's Room" txtColor='black' absolute={true} openMenu={() => setIsOpen(true)}/>
      <Canvas camera={{ fov: 60 }} shadows>
      {/* 
      Creates 3D canvas here
      Camera position is [x(horizontal), y(vertical), z(depth)] axis. So in this case, the camera backs away from origin
      "fov" is field of view. Usually 45-75
      */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>
        {/* <axesHelper args={[10]}/> */}
        <gridHelper args={[20, 20]}/>
        <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
        {/* This one enables user to interact with camera angle */}
        <ambientLight intensity={0.5} color="red" />
        {/* 
          This is ambient light that lights up evetything evenly.
          Without this, the bottom side of the object gets completely dark.
        */}
        <directionalLight position={[3, 3, 3]} intensity={.7} />
        {/* 
          This is a directional light like sunlight shining from a direction.
          position is also [x, y, z] axis. And the light is positioned there in space and shines towards the object naturally
        */}
        <Environment preset="sunset" background blur={1} />
        <SpinningBox />
        <Sphere />
        <Knot />
        <BigRectToCastShadow />
        <SpotLightWithHelper />
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        {/* Set default camera position */}
      </Canvas>
    </div>
  )
}

export default Basic
