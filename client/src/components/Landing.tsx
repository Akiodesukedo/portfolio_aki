import Marquee from 'react-fast-marquee'
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

type LandingProps = {
}

const Landing: React.FC<LandingProps> = ({}) => {

  const [title, setTitle] = useState<string>("Frontend Developer");
  const titleNum = useRef(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const isLarge = useMediaQuery({ minWidth: 1024 })

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      // Basically this setTimeout waits for the fade out before switching a title to another.
      setTimeout(() => {
        titleNum.current += 1;
        if (titleNum.current === titles.length) {
          titleNum.current = 0;
        }
  
        setTitle(titles[titleNum.current])
        setIsVisible(true);
      }, 500)
    }, 4000);

    return () => clearInterval(interval);
  }, [title]);

  const titles: string[] = [
    "Full-stack Developer",
    "React Enthusiast",
    "Software Engineer",
    "Tennis Lover",
    "Web App Developer",
    "Snowboarder",
    "Frontend Developer"
  ]

  return (
    <div className="h-screen bg-white w-full">
      <img 
        src="/images/aki_2.webp"
        alt="Aki portrait photo"
        className="object-cover object-[47%_20%] h-screen w-full bg-white mask-b-from-50% mask-b-to-80% "
      />
      <div className='relative bottom-[280px] h-[280px] flex flex-col justify-between'>
        <div>
          <Marquee
            speed={isLarge ? 140 : 60}
          >
            <p className='text-[110px] lg:text-[130px] font-medium text-black leading-[150px] lg:leading-[180px]'>
              Akifumi Hayashi&nbsp;
            </p>
          </Marquee>
          <p
            className={`text-left text-black text-[26px] ml-[10px] md:ml-[40px] transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100': 'opacity-0'}`}
          >
            { title }
          </p>
        </div>
        <p className='text-right text-[30px] text-black font-medium mr-[10px] md:mr-[40px] mb-[14px] md:mb-[30px]'>Explore {"\u2193"}</p>
      </div>

    </div>
  )
}

export default Landing
