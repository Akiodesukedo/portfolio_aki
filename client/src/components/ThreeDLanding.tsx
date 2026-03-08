import Marquee from 'react-fast-marquee'
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Canvas } from '@react-three/fiber';
import Avatar from '../atoms/Avatar';
import { CameraControls } from '@react-three/drei';
import FloatingObj from '../atoms/FloatingObj';
import ResponsiveCamera from '../atoms/ResponsiveCamera';
import { AnimatePresence, motion } from "framer-motion";

const TITLES: string[] = [
  "Full-stack Developer",
  "React Enthusiast",
  "Software Engineer",
  "Tennis Lover",
  "Web App Developer",
  "Snowboarder",
  "Frontend Developer"
]

type ThreeDLandingProps = {
}

const ThreeDLanding: React.FC<ThreeDLandingProps> = ({}) => {

  const [titleIndex, setTitleIndex] = useState(0);
  const isLarge = useMediaQuery({ minWidth: 1024 })

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 4000);
  
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-screen bg-white w-full">
      <Canvas 
        camera={{ position: [0, 1.5, 4], fov: 40}}
        className='bg-white mask-b-from-50% mask-b-to-80%'
      >
        <ResponsiveCamera />
        <CameraControls 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 1.6} 
          minDistance={1.5}
          maxDistance={6}
          truckSpeed={0}
        />
        <ambientLight intensity={1}/>
        <directionalLight
          position={[2, 4, 4]}
          intensity={.7}
        />
        <directionalLight
          position={[-2, 2, 3]}
          intensity={0.7}
        />

        <Avatar />

        <FloatingObj 
          url='/models/iphone.glb'
          orbitRadius={2}
          orbitSpeed={.3}
          startAngle={0}
          scale={.5}
        />
        <FloatingObj 
          url='/models/typescript_logo.glb'
          orbitRadius={2}
          orbitSpeed={.3}
          startAngle={(Math.PI * 2) / 5}
          scale={.4}
        />
        <FloatingObj 
          url='/models/racket.glb'
          orbitRadius={2}
          orbitSpeed={.3}
          startAngle={(Math.PI * 4) / 5}
          scale={.6}
        />
        <FloatingObj 
          url='/models/macbook.glb'
          orbitRadius={2}
          orbitSpeed={.3}
          startAngle={(Math.PI * 6) / 5}
          scale={.4}
        />
        <FloatingObj 
          url='/models/react_logo.glb'
          orbitRadius={2}
          orbitSpeed={.3}
          startAngle={(Math.PI * 8) / 5}
          scale={.4}
        />
      </Canvas>
      <div className='relative bottom-[280px] h-[280px] flex flex-col justify-between'>
        <div>
          <Marquee
            speed={isLarge ? 140 : 60}
          >
            <p className='text-[110px] lg:text-[130px] font-medium text-black leading-[150px] lg:leading-[180px]'>
              Akifumi Hayashi&nbsp;
            </p>
          </Marquee>
          <AnimatePresence mode="wait">
            <motion.p
              key={TITLES[titleIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="text-left text-black text-[26px] ml-[10px] md:ml-[40px]"
            >
              {TITLES[titleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className='text-right text-[30px] text-black font-medium mr-[10px] md:mr-[40px] mb-[14px] md:mb-[30px]'>Explore {"\u2193"}</p>
      </div>

    </div>
  )
}

export default ThreeDLanding
