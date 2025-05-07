import { useNavigate } from "react-router-dom";
import CtaBtn from "../atoms/CtaBtn";
import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import TopMessage from "../components/TopMessage";

const About = () => {

  const navigate = useNavigate();
  const {isOpen, setIsOpen} = useMenu();

  return (
    <div>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
      <Header WebsiteName="Aki's Room" openMenu={() => setIsOpen(true)}/>
      <TopMessage line1="Here is what makes" line2="Aki SPECIAL"/>
      <CtaBtn btnMsg='Back to Home' bgColor='white' borderColor='black' txtColor='black' passedFunc={() => navigate('/')}/>
      <Footer email="abtai0227aki@gmail.com" github="github link" linkedIn="linedIn link" />
    </div>
  )
}

export default About
