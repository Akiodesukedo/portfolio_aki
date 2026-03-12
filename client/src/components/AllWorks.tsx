import React from 'react'
import ProjectCard from '../molecules/ProjectCard'

type Work = {
  _id: string,
  title: string,
  year: string,
  imageUrl?: string,
  tags: string[],
  description: string,
  detailedDesc: string,
}

type AllWorkProps = {
  allWorks: Work[]
}

const AllWorks: React.FC<AllWorkProps> = ({ allWorks }) => {
  return (
    <div className='mx-[30px] md:mx-[60px] mt-[100px] pb-[60px] max-w-[1160px] xl:mx-auto'>
      {allWorks.map((work) => (
        <div key={work._id}>
          <ProjectCard projectData={work}/>
        </div>
      ))}
    </div>
  )
}

export default AllWorks
