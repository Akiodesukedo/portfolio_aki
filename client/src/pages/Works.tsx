import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import TopMessage from "../components/TopMessage";
import AllWorks from "../components/AllWorks";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch(`${fetchUrl}/works/Works`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      setAllWorks(data);
    })
    .catch(err => console.error(err));
  }, [])

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
