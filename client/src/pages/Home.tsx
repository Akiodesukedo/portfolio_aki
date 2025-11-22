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

  return (
    <div>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
      <Header WebsiteName="Aki's Room" txtColor='white' absolute={true} openMenu={() => setIsOpen(true)}/>
      <Landing />
      <Intro />
      {
        majorWorks == undefined ? <p>Loading...</p> : <MajorWork majorWorks={majorWorks}/>
      }
      <Footer />
    </div>
  )
}

export default Home
