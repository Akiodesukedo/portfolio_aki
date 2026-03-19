// import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import TopMessage from "../components/TopMessage";
import { usePageTransition } from "../context/PageTransitionContext";
import CtaBtn from "../atoms/CtaBtn";

const NotFound: React.FC = ({}) => {

  // const navigate = useNavigate();
  const {isOpen, setIsOpen} = useMenu();
  const { triggerTransition } = usePageTransition();

  return (
    <div>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
      <Header WebsiteName="Aki's Room" openMenu={() => setIsOpen(true)}/>
      <div className="p-[24px] sm:py-[64px]">
        <TopMessage line1="Oops! The page you're" line2="looking for doesn't exist."/>
        <CtaBtn 
          btnMsg="Go Back Home" 
          passedFunc={() => triggerTransition('/')}
          borderColor="#747474"
          bgColor="bg-white"
          txtColor="text-black"
          marginTop="mt-[64px]"
          hoverBgColor="hover:bg-black"
          hovertxtColor="hover:text-white"
        />
      </div>
      <Footer />
    </div>
  )
}

export default NotFound
