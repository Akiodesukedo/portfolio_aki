import { useNavigate } from "react-router-dom";
import CtaBtn from "../atoms/ctaBtn";

const Test = () => {

  const navigate = useNavigate();
  const navigateToTest = () => {
    navigate('/')
  }

  return (
    <div>
      <h1>Test Page here</h1>
      <CtaBtn btnMsg='Move to Test Page' bgColor='white' borderColor='black' txtColor='black' passedFunc={navigateToTest}/>
    </div>
  )
}

export default Test
