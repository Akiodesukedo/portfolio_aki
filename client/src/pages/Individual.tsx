import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import ParaSection from "../components/ParaSection";
import WorkTop from "../components/WorkTop";

const Individual: React.FC = ({}) => {
  const {isOpen, setIsOpen} = useMenu();

  return (
    <div>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
      <Header WebsiteName="Aki's Room" openMenu={() => setIsOpen(true)}/>
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
      <Footer email="abtai0227aki@gmail.com" github="github link" linkedIn="linedIn link" />
    </div>
  )
}

export default Individual
