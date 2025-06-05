import React from 'react'
import ProjectCard from '../molecules/ProjectCard'
import LineDivider from '../atoms/LineDivider'

type Work = {
  title: string,
  year: string,
  imageUrl?: string,
  tags: string[],
  description: string
}

type AllWorkProps = {
  allWorks: Work[]
}

const AllWorks: React.FC<AllWorkProps> = ({ allWorks }) => {
  return (
    <div className='mx-[30px] mt-[100px] mb-[60px]'>
      {allWorks.map((work) => (
        <div key={work.title}>
          <ProjectCard projectData={work}/>
          <LineDivider mTop='50px' mBottom='40px'/>
        </div>
      ))}
    </div>
  )
}

export default AllWorks
