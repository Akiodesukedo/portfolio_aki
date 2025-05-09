import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import TopMessage from "../components/TopMessage";
import AllWorks from "../components/AllWorks";

const Works = () => {

  const {isOpen, setIsOpen} = useMenu();

    // 🚨 THIS IS FAKE DATA (needs to be replaced with actual data from mongoDB)
    const allWorks = [
      {
        title: "GlucoFit",
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
      },
      {
        title: "FitTrackr",
        year: "2023",
        tags: ["React Native", "Expo", "SQLite", "TypeScript"],
        description: "A mobile fitness tracker that helps users log workouts, monitor progress, and set custom fitness goals. Works offline with local storage support."
      },
      {
        title: "LangBridge",
        year: "2024",
        tags: ["Next.js", "Supabase", "TailwindCSS", "i18n"],
        description: "A language exchange web platform that connects learners across the globe using real-time chat and AI-powered conversation prompts."
      },
      {
        title: "DevMeet",
        year: "2023",
        tags: ["React", "Socket.IO", "Express", "MongoDB"],
        description: "A real-time developer meetup app where users can find coding buddies, schedule sessions, and collaborate using integrated video and chat features."
      }
    ]

  return (
    <div>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
      <Header WebsiteName="Aki's Room" openMenu={() => setIsOpen(true)}/>
      <TopMessage line1="Here is what" line2="Akifumi created"/>
      <AllWorks allWorks={allWorks}/>
      <Footer email="abtai0227aki@gmail.com" github="github link" linkedIn="linedIn link" />
    </div>
  )
}

export default Works
