import { useNavigate } from "react-router-dom";
import CtaBtn from "../atoms/CtaBtn";
import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";

const Test = () => {

  const navigate = useNavigate();
  const {isOpen, setIsOpen} = useMenu();

  return (
    <div>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
      <Header WebsiteName="Aki's Room" openMenu={() => setIsOpen(true)}/>
      <h1>Test Page here</h1>
      <CtaBtn btnMsg='Move to Test Page' bgColor='white' borderColor='black' txtColor='black' passedFunc={() => navigate('/')}/>
    </div>
  )
}

export default Test
