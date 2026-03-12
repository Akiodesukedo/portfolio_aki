import React from 'react'
import ProjectCard from '../molecules/ProjectCard'
import { usePageTransition } from '../context/PageTransitionContext'

type Work = {
  _id: string,
  title: string,
  year: string,
  projectImageUrl?: string,
  tags: string[],
  description: string,
  detailedDesc: string,
}

type MajorWorkProps = {
  majorWorks: Work[]
}

const MajorWork: React.FC<MajorWorkProps> = ({ majorWorks }) => {
  const { triggerTransition } = usePageTransition();

  return (
    <div className='mx-[30px] mt-[100px] mb-[60px] md:mx-[60px] max-w-[1160px] xl:mx-auto'>
      <h2 className='font-bold text-[36px] text-left'>MAJOR WORKS</h2>
      {majorWorks.map((work) => (
        <div key={work._id}>
          <ProjectCard projectData={work}/>
        </div>
      ))}
      <button
        className='border border-neutral-600 rounded-full h-[64px] px-[40px] mt-[60px] md:px-[80px] hover:border-black hover:text-white hover:bg-black cursor-pointer duration-200 ease-in'
        onClick={() => triggerTransition("/works")}
      >
        More Work
      </button>
    </div>
  )
}

export default MajorWork
