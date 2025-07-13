// import { useNavigate } from "react-router-dom"
import RightTriangleBtn from "../atoms/RightTriangleBtn"
import { usePageTransition } from "../context/PageTransitionContext"

type IntroProps = {
}

const Intro: React.FC<IntroProps> = () => {
  // const navigate = useNavigate()
  const { triggerTransition } = usePageTransition();

  return (
    <div className="relative mx-[30px] mt-[100px] mb-[260px] md:mb-[140px] md:mx-[60px]">
      <p className="text-left text-[18px] font-bold mb-[50px]">
        Front-end web & mobile app developer with hands-on experience across multiple agile projects.
      </p>
      <p className="text-left text-[16px] w-7/9 md:hidden">
        Excel in React.js, React Native, JavaScript, TypeScript, and MongoDB, with a growing focus on GraphQL, backend technologies, and third-party integrations.
      </p>
      <p className="text-left text-[16px] w-2/3 hidden md:block">
        Akifumi specializes in React.js, React Native, JavaScript, TypeScript, MongoDB, and the MERN stack, with a growing passion for GraphQL, backend development, and third-party integrations. Known for his curiosity and disciplined mindset, he learns quickly and takes initiative to bring ideas to life.
      </p>
      <div className="absolute bottom-[-170px] md:bottom-[-60px] right-0">
        <RightTriangleBtn line1='More' line2='About Aki' passedFunc={() => triggerTransition('/about')}/>
      </div>
    </div>
  )
}


export default Intro
