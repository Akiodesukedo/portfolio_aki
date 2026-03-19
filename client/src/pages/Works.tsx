import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import TopMessage from "../components/TopMessage";
import AllWorks from "../components/AllWorks";
import { useEffect, useRef, useState } from "react";
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

const Works = () => {

  const fetchUrl = import.meta.env.VITE_BACKEND_URL;
  const {isOpen, setIsOpen} = useMenu();
  const [allWorks, setAllWorks] = useState<Work[]>();
  const { isTransitioning } = usePageTransition();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!isTransitioning && !hasFetched.current) {
      hasFetched.current = true;

      fetch(`${fetchUrl}/works/Works`)
        .then(async res => {
          const data = await res.json();
          // console.log(data);
          setAllWorks(data);
        })
        .catch(err => console.error(err));    
    }

    if (isTransitioning) {
      hasFetched.current = false;
    }
  }, [isTransitioning])

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
      <Header WebsiteName="Aki's Room" openMenu={() => setIsOpen(true)}/>
      <TopMessage line1="Here is what" line2="Akifumi created"/>
      {
        allWorks == undefined ? 
        <motion.div
        animate="pulse"
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
        className="flex justify-center items-center gap-[20px] my-[80px] md:my-[160px]"
        >
          <motion.div className="w-[20px] h-[20px] rounded-2xl bg-black will-change-transform" variants={dotLoading} />
          <motion.div className="w-[20px] h-[20px] rounded-2xl bg-black will-change-transform" variants={dotLoading} />
          <motion.div className="w-[20px] h-[20px] rounded-2xl bg-black will-change-transform" variants={dotLoading} />
        </motion.div>
        : 
        <AllWorks allWorks={allWorks}/>
      }
      <Footer />
    </div>
  )
}

export default Works
