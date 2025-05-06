import RightTriangleBtn from "../atoms/RightTriangleBtn"

type IntroProps = {
}

const Intro: React.FC<IntroProps> = () => {
  return (
    <div className="relative mx-[30px] mt-[100px] mb-[260px]">
      <p className="text-left text-[18px] font-bold mb-[50px]">
        Front-end web & mobile app developer with hands-on experience across multiple agile projects.
      </p>
      <p className="text-left text-[16px] w-7/9">
        Excel in React.js, React Native, JavaScript, TypeScript, and MongoDB, with a growing focus on GraphQL, backend technologies, and third-party integrations.
      </p>
      <div className="absolute bottom-[-170px] right-0">
        <RightTriangleBtn line1='More' line2='About Aki'/>
      </div>
    </div>
  )
}


export default Intro
