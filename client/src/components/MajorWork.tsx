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

type MajorWorkProps = {
  majorWorks: Work[]
}

const MajorWork: React.FC<MajorWorkProps> = ({ majorWorks }) => {
  return (
    <div className='mx-[30px] mt-[100px] mb-[60px]'>
      <h2 className='font-bold text-[36px] text-left mb-[32px]'>MAJOR WORKS</h2>
      {majorWorks.map((work) => (
        <div>
          <ProjectCard projectData={work}/>
          <LineDivider mTop='50px' mBottom='40px'/>
        </div>
      ))}
      <button
        className='border border-neutral-600 rounded-full h-[64px] px-[40px]'
      >More Work</button>
    </div>
  )
}

export default MajorWork
