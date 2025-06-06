import React from 'react'
import Tag from '../atoms/Tag'
import { useNavigate } from 'react-router-dom'

type ProjectCardProps = {
  projectData: {
    _id: string,
    title: string,
    year: string,
    projectImageUrl?: string,
    tags: string[],
    description: string
  }
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData }) => {
  const navigate = useNavigate();

  return (
    <div 
      className='w-full'
      onClick={() => {
        navigate(`/work/${projectData._id}`)
      }}
    >
      <div className='flex flex-nowrap justify-between items-center mb-[12px]'>
        <h3 className='text-[30px]'>{ projectData.title }</h3>
        <p className='text-[14px] text-neutral-700'>{ projectData.year }</p>
      </div>
      { projectData.projectImageUrl ?
          <img src={projectData.projectImageUrl} alt={projectData.title} />
        :
          <div className="h-[180px] w-full bg-neutral-300"></div>
      }
      <div className='flex flex-wrap gap-x-[6px] gap-y-[5px] mt-[26px] mb-[20px]'>
        {projectData.tags.map((tag, index) => (
          <Tag tagName={tag} key={index}/>
        ))}
      </div>
      <p className='leading-[18px] text-[14px] text-left'>{ projectData.description }</p>
    </div>
  )
}

export default ProjectCard
