
import { useNavigate } from 'react-router-dom';
import '../App.css'
import Tag from '../atoms/Tag'
import BtnExample from '../atoms/BtnExample'
import CtaBtn from '../atoms/CtaBtn'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Landing from '../components/Landing';

const Home = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Header WebsiteName="Aki's Room" txtColor='white' absolute={true}/>
      <Landing />
      <h1>Aki's portfolio</h1>
      <BtnExample />
      <Tag tagName="tag example here"/>
      <CtaBtn btnMsg='Move to Test Page' bgColor='white' borderColor='black' txtColor='black' passedFunc={() => navigate('/test')}/>
      <Footer email="abtai0227aki@gmail.com" github="github link" linkedIn="linedIn link" />
    </div>
  )
}

export default Home
