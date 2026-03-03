import ExpEduSection from "../molecules/ExpEduCard"

const Experience: React.FC = () => {
  return (
    <div className="mx-[24px] md:mx-[60px] mb-[60px] max-w-[1160px] xl:mx-auto">
      <h3 className="text-[26px] font-medium text-left mb-[22px]">
        Education
      </h3>
      <div className="flex flex-col gap-[24px]">
        <ExpEduSection 
          name="Full-stack Software Developer"
          title="Freelance"
          startDate="May 2025"
          endDate="Present"
          line1="Design and deploy full-stack web applications using React, TypeScript, and Node.js"
          line2="Architect backend APIs and manage cloud deployments on AWS"
          line3="Collaborate directly with designers and stakeholders to translate designs into functional, production-ready applications"
        />
        <ExpEduSection 
          name="GlucoFit - Capstone Project"
          title="Full-Stack Developer"
          startDate="Sept 2024"
          endDate="Jan 2025"
          line1="Built a cross-platform iOS mobile application using React Native and TypeScript"
          line2="Integrated third-party blood glucose monitoring device into iOS app via Bluetooth"
          line3="Managed iOS-specific setup such as .pem files, Bluetooth configuration, and iOS build dependencies"
        />
        <ExpEduSection 
          name="Assistant Manager"
          title="Delara Restaurant"
          startDate="April 2023"
          endDate="Present"
          line1="Oversee front-of-house operations, coordinating service flow, floor planning, and team communication to ensure a seamless guest experience"
          line2="Manage inventory forecasting and supplier ordering to maintain operational continuity and cost efficiency"
          line3="Act as Manager on Duty, resolving customer concerns and facilitating collaboration between front-of-house and kitchen teams under high-pressure service environments"
        />
      </div>

    </div>
  )
}

export default Experience