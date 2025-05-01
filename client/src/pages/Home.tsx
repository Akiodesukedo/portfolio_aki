
import { useNavigate } from 'react-router-dom';
import '../App.css'
import Tag from '../atoms/Tag'
import BtnExample from '../atoms/BtnExample'
import CtaBtn from '../atoms/CtaBtn'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Landing from '../components/Landing';
import MajorWork from '../components/MajorWork';

const Home = () => {

  const navigate = useNavigate();

  // 🚨 THIS IS FAKE DATA (needs to be replaced with actual data from mongoDB)
  const majorWorks = [
    {
      title: "GlucoseMate",
      year: "2024",
      tags: ["React Native", "TypeScript", "GraphQL", "MongoDB", "AWS"],
      description: "A blood glucose monitoring app for people managing diabetes and PCOS. Includes real-time syncing with glucose devices, nutrition tracking, and predictive analytics."
    },
    {
      title: "DrinkScale PWA",
      year: "2024",
      tags: ["React", "PWA", "Firebase Auth", "MongoDB", "Express"],
      description: "A progressive web app to store, scale, and customize drink recipes. Users can log in, view scaled ingredient quantities, and share recipes with friends."
    },
    {
      title: "Aki's Room",
      year: "2025",
      tags: ["Vite", "TailwindCSS", "TypeScript", "Render", "Vercel"],
      description: "My personal portfolio website showcasing my projects and development journey. Fully responsive and deployed using Vercel with backend on Render."
    }
  ]

  return (
    <div>
      <Header WebsiteName="Aki's Room" txtColor='white' absolute={true}/>
      <Landing />
      <MajorWork majorWorks={majorWorks}/>
      <h1>Aki's portfolio</h1>
      <BtnExample />
      <Tag tagName="tag example here"/>
      <CtaBtn btnMsg='Move to Test Page' bgColor='white' borderColor='black' txtColor='black' passedFunc={() => navigate('/test')}/>
      <Footer email="abtai0227aki@gmail.com" github="github link" linkedIn="linedIn link" />
    </div>
  )
}

export default Home
