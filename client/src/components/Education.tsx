import ExpEduSection from "../molecules/ExpEduSection"

const Education: React.FC = () => {
  return (
    <div className="mx-[24px] md:mx-[60px] mb-[60px] max-w-[1160px] xl:mx-auto">
      <h3 className="text-[26px] font-medium text-left mb-[22px]">
        Education
      </h3>
      <div className="flex flex-col">
        <ExpEduSection 
          name="Diploma - Web & Mobile App Design and Development"
          title="Langara College"
          startDate="Sept 2023"
          endDate="May 2025"
          line1="Gained hands-on experience building full-stack applications using React, TypeScript, Node.js, Express, and modern JavaScript ecosystems"
          line2="Developed backend systems with authentication, secure data handling, database management, and cloud deployment (AWS)"
          line3="Proactively self-studied frameworks and tools prior to each term to maximize contribution in team-based capstone and production-style projects"
          imgSrc="/images/langara_logo.webp"
        />
        <ExpEduSection 
          name="Bachelor's Degree in Economics"
          title="Waseda University, Tokyo, Japan"
          startDate="April 2016"
          endDate="March 2021"
          line1="Developed strong analytical thinking through coursework in microeconomics, macroeconomics, and quantitative analysis"
          line2="Presented research findings and economic case studies in seminar-based discussions and public presentations"
          line3="Developed strong personal discipline, time management, and the ability to consistently meet academic deadlines"
          imgSrc="/images/waseda_logo.webp"
          lastItem={true}
        />
      </div>

    </div>
  )
}

export default Education