import Marquee from 'react-fast-marquee'
import selfImg from '../assets/imgs/self_img.jpg'
import { useEffect, useRef, useState } from 'react';

type LandingProps = {
}

const Landing: React.FC<LandingProps> = ({}) => {

  const [title, setTitle] = useState<string>("Frontend Developer");
  const titleNum = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      titleNum.current += 1;
      if (titleNum.current === titles.length) {
        titleNum.current = 0;
      }

      setTitle(titles[titleNum.current])
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [title]);

  const titles: string[] = [
    "Frontend Developer",
    "React Enthusiast",
    "Software Engineer",
    "Tennis Lover",
    "Web App Developer",
    "Snowboarder",
    "Full-Stack Developer"
  ]

  return (
    <div className="h-screen bg-amber-200 w-full">
      <img 
        src={selfImg}
        alt="Aki presenting"
        className="object-cover h-full"
      />
      <div className='absolute inset-0 bg-neutral-700 opacity-70'></div>
      <div className='relative bottom-[300px]'>
        <Marquee
          speed={60}
        >
          <p className='text-[110px] font-medium text-white'>
            Akifumi Hayashi&nbsp;
          </p>
        </Marquee>
        <p
          className='text-left text-white text-[30px] font-medium'
        >
          { title }
        </p>
      </div>

    </div>
  )
}

export default Landing
