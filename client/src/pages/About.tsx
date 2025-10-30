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
        paragraph1="One of the qualities I'm most proud of is my commitment to contributing to my community. I genuinely enjoy supporting the people around me, and that energy always comes back in meaningful ways. My curiosity is what drives this — I love learning new things because every new skill or perspective opens doors I didn't even know existed. I also enjoy seeing others grow through what I share, and learning alongside them. That's why I never stop asking questions, meeting new people, and challenging myself. Even when I face obstacles, my curiosity and the support of my community help me push through. If you also value learning, growth, and teamwork, I'm sure we can do great things together."
        imageUrl="/images/portrait.webp"
        colDiv={true}
      />
      <ParaSection 
        title="Experience"
        paragraph1="I'm a full-stack web and mobile app developer with two years of hands-on experience working on agile projects, primarily using the React ecosystem, the MERN stack, and occasionally GraphQL. My focus has been on creating solutions to real-world problems — from developing a blood sugar tracking app for diabetes management to building an inventory management system for coconut middle buyers in the Philippines. These experiences have given me a holistic understanding of how to design and develop web and mobile applications efficiently, both on the frontend and backend. If you are curious about what my team and I have built, feel free to check out the Works page for more details!"
      />
      <Expertise />
      <ParaSection 
        title="Strength"
        paragraph1={`・Problem solving and analytical thinking\n・Logical and structured approach to challenges\n・Hands-on agile project experience\n・Strong public speaking and communication skills\n・Natural curiosity and love for continuous learning\n・Long-term planning and strategic mindset\n・Punctual and reliable under deadlines\n・Team-oriented mindset with a collaborative spirit\n・Adaptability when facing new tools or technologies\n・Empathy and drive to contribute to community growth`}
      />
      <Footer />
    </div>
  )
}

export default About
