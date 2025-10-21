import '../App.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Landing from '../components/Landing';
import MajorWork from '../components/MajorWork';
import Intro from '../components/Intro';
import Menu from '../components/Menu';
import { useMenu } from '../context/MenuContext';
import { useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState<boolean>(true);

  const ids = [
    "682f8c0d572177bcf8d85c37",
    "682fa1da05ef77fe27e804e3",
    "683b449ceb5429988bd66e9a"
  ]

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, [])

  useEffect(() => {
    const query = ids.map(id => `ids=${id}`).join("&");
    // console.log(query);

    fetch(`${fetchUrl}/works/by-ids?${query}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setMajorWorks(data);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className='fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-700 ease-in-out opacity-100'>
        <h1 className="text-white text-[36px] font-bold animate-fade-in">Welcome to Aki's Room</h1>
      </div>
    )
  }

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
