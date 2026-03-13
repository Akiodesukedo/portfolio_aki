const Sphere: React.FC = () => {
  return (
    <mesh>
      <sphereGeometry args={[6, 8, 8]} />
      {/* 
        args represents, [radius, num of vertices on width, num of vertices on heights] 
        So basically the higher the second and third args are, smoother it gets
      */}
      <meshBasicMaterial wireframe/>
    </mesh>
  )
}

export default Sphere