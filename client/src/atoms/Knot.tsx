const Knot:React.FC = () => {
  return (
    <mesh 
      position={[-2.5, 2, -1.5]} 
      rotation={[0, 0, Math.PI]} 
    >
    {/* 
      position is [x, y, z]
    */}
      <torusKnotGeometry args={[1, .3, 256, 256]}/>
      {/* 
        Args are [radius, girth of the pipe, smoothness of width, smoothness of height]
      */}
      <meshToonMaterial color="gold"/>
    </mesh>
  )
}

export default Knot