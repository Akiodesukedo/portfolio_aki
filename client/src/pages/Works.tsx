import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import TopMessage from "../components/TopMessage";
import AllWorks from "../components/AllWorks";
import { useEffect, useRef, useState } from "react";
import { usePageTransition } from '../context/PageTransitionContext';

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

  return (
    <div>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
      <Header WebsiteName="Aki's Room" openMenu={() => setIsOpen(true)}/>
      <TopMessage line1="Here is what" line2="Akifumi created"/>
      {
        allWorks == undefined ? <p>loading...</p> : <AllWorks allWorks={allWorks}/>
      }
      <Footer />
    </div>
  )
}

export default Works
