import '../App.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Landing from '../components/Landing';
import MajorWork from '../components/MajorWork';
import Intro from '../components/Intro';
import Menu from '../components/Menu';
import { useMenu } from '../context/MenuContext';
import { useEffect, useRef, useState } from 'react';
import { usePageTransition } from '../context/PageTransitionContext';
import { motion, Variants } from "motion/react"

type Work = {
  _id: string,
  title: string,
  year: string,
  projectImageUrl?: string,
  tags: string[],
  description: string,
  detailedDesc: string,
}

const Home = () => {

  const fetchUrl = import.meta.env.VITE_BACKEND_URL;
  const {isOpen, setIsOpen} = useMenu();
  const [majorWorks, setMajorWorks] = useState<Work[]>();
  const { isTransitioning } = usePageTransition();
  const hasFetched = useRef(false);
 
  const ids = [
    "682f8c0d572177bcf8d85c37",
    "68fbc6a443ea53a0d6099440",
    "682fa1da05ef77fe27e804e3"
  ]

  useEffect(() => {
    if (!isTransitioning && !hasFetched.current) {
      hasFetched.current = true;

      const query = ids.map(id => `ids=${id}`).join("&");
      // console.log(query);

      fetch(`${fetchUrl}/works/by-ids?${query}`)
        .then(async res => {
          const data = await res.json();
          // console.log(data);
          setMajorWorks(data);
        })
        .catch(err => console.error(err));
    }

    if (isTransitioning) {
      hasFetched.current = false;
    }

  }, [isTransitioning]);

  const dotLoading: Variants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
      <Header WebsiteName="Aki's Room" txtColor='black' absolute={true} openMenu={() => setIsOpen(true)}/>
      <Landing />
      <Intro />
      {
        majorWorks == undefined ? 
        <div className='mx-[30px] md:mx-[60px] max-w-[1160px] xl:mx-auto'>
          <h2 className='font-bold text-[36px] text-left mb-[32px]'>MAJOR WORKS</h2>
          <motion.div
            animate="pulse"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="flex justify-center items-center gap-[20px] my-[80px] md:my-[160px]"
          >
            <motion.div className="w-[20px] h-[20px] rounded-2xl bg-black will-change-transform" variants={dotLoading} />
            <motion.div className="w-[20px] h-[20px] rounded-2xl bg-black will-change-transform" variants={dotLoading} />
            <motion.div className="w-[20px] h-[20px] rounded-2xl bg-black will-change-transform" variants={dotLoading} />
          </motion.div>
        </div>
        : 
        <MajorWork majorWorks={majorWorks}/>
      }
      <Footer />
    </div>
  )
}

export default Home
