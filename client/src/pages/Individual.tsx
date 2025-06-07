import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import ParaSection from "../components/ParaSection";
import WorkTop from "../components/WorkTop";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Individual: React.FC = ({}) => {
  const { id } = useParams();
  const fetchUrl = import.meta.env.VITE_BACKEND_URL;
  const {isOpen, setIsOpen} = useMenu();
  const [project, setProject] = useState();

  useEffect(() => {
    fetch(`${fetchUrl}/works/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProject(data);
      })
      .catch(err => console.error(err));
  }, [id])

  return (
    <div>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
      <Header WebsiteName="Aki's Room" openMenu={() => setIsOpen(true)}/>
      {
        project == undefined ? <p>loading...</p> : 
        <div>
          <div className="h-[600px] m-[30px] bg-amber-200"></div>
          <WorkTop 
            title="GlucoFit"
            paragraph1="Brief introduction of this app here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum pellentesque libero vel tristique. Aliquam at ligula pharetra, tincidunt magna sit amet, blandit magna. Cras sed turpis congue sem porttitor tincidunt.Aliquam at ligula pharetra, tincidunt magna sit amet, blandit magna."
          />
          <ParaSection 
            title="Tech Stack" 
            imageUrl="/images/glucofit_techstack.png"
          />
          <ParaSection 
            title="Strength"
            paragraph1={`・Problem solving\n・Logical thinking\n・Agile project experience\n・Public speaking\n・Curiosity\n・Long term planning ability\n・Punctuality\n`}
          />
          <Footer />
        </div>
      }
    </div>
  )
}

export default Individual
