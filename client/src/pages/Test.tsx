import { useNavigate } from "react-router-dom";
import CtaBtn from "../atoms/CtaBtn";
import Header from "../components/Header";

const Test = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Header WebsiteName="Aki's Room"/>
      <h1>Test Page here</h1>
      <CtaBtn btnMsg='Move to Test Page' bgColor='white' borderColor='black' txtColor='black' passedFunc={() => navigate('/')}/>
    </div>
  )
}

export default Test
