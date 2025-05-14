// import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import TopMessage from "../components/TopMessage";
import ParaSection from "../components/ParaSection";
import Expertise from "../components/Expertise";

const About: React.FC = ({}) => {

  // const navigate = useNavigate();
  const {isOpen, setIsOpen} = useMenu();

  return (
    <div>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
      <Header WebsiteName="Aki's Room" openMenu={() => setIsOpen(true)}/>
      <TopMessage line1="Here is what makes" line2="Akifumi SPECIAL"/>
      <ParaSection 
        title="Value" 
        paragraph1="I'll think about this later haha. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum pellentesque libero vel tristique. Aliquam at ligula pharetra, tincidunt magna sit amet, blandit magna. Cras sed turpis congue sem porttitor tincidunt.Aliquam at ligula pharetra, tincidunt magna sit amet, blandit magna."
        imageUrl="/images/portrait.JPEG"
      />
      <ParaSection 
        title="Experience"
        paragraph1="I'm a front-end web & mobile app developer with 1 year of hands-on experience across multiple agile projects. I mainly focused on projects that provide solutions to real-life problems like blood sugar level tracking for diabetes patients, streamlining inventory management for coconut middle buyers in Philippines, and so on. Please check out Work page for details!"
      />
      <Expertise />
      <ParaSection 
        title="Strength"
        paragraph1={`・Problem solving\n・Logical thinking\n・Agile project experience\n・Public speaking\n・Curiosity\n・Long term planning ability\n・Punctuality\n`}
      />
      <Footer email="abtai0227aki@gmail.com" github="github link" linkedIn="linedIn link" />
    </div>
  )
}

export default About
