const BigRectToCastShadow:React.FC = () => {
  return (
    <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color={"white"}/>
    </mesh>
  )
}

export default BigRectToCastShadow