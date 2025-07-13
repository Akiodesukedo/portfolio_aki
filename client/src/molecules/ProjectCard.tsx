import React from 'react'
import Tag from '../atoms/Tag'
import { usePageTransition } from '../context/PageTransitionContext'
import { useMediaQuery } from 'react-responsive'

type ProjectCardProps = {
  projectData: {
    _id: string,
    title: string,
    year: string,
    projectImageUrl?: string,
    tags: string[],
    description: string,
    detailedDesc: string,
  }
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData }) => {
  const { triggerTransition } = usePageTransition();
  const isLarge = useMediaQuery({ minWidth: 1024 })

  return (
    <div 
      className='w-full md:grid md:grid-cols-2 lg:grid-cols-[500px_auto] gap-[12px] md:gap-x-[24px] lg:gap-x-[36px] md:grid-rows-[auto_auto_1fr] '
      onClick={() => {
        triggerTransition(`/work/${projectData._id}`)
      }}
    >
      <div className='flex flex-nowrap justify-between items-center mb-[12px] md:col-span-1 md:col-start-2 md:mb-0'>
        <h3 className='text-[30px]'>{ projectData.title }</h3>
        <p className='text-[14px] text-neutral-700'>{ projectData.year }</p>
      </div>
      { projectData.projectImageUrl ?
          <img src={projectData.projectImageUrl} alt={projectData.title} className='object-cover h-full md:col-span-1 md:col-start-1 md:row-span-3 md:row-start-1'/>
        :
          <div className="h-[180px] w-full bg-neutral-300 md:col-span-1 md:col-start-1"></div>
      }
      <div className='flex flex-wrap gap-x-[6px] gap-y-[5px] mt-[26px] mb-[20px] md:col-span-1 md:col-start-2 md:my-auto '>
        {projectData.tags.map((tag, index) => (
          <Tag tagName={tag} key={index}/>
        ))}
      </div>
      <p className='leading-[18px] text-[14px] text-left md:col-span-1 md:col-start-2'>{ isLarge ? projectData.detailedDesc : projectData.description }</p>
    </div>
  )
}

export default ProjectCard
