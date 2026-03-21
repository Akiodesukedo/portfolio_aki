import React from 'react'
import Tag from '../atoms/Tag'
import { usePageTransition } from '../context/PageTransitionContext'
import * as motion from "motion/react-client"

type BlogCardProps = {
  blogData: {
    _id: string,
    title: string,
    slug: string,
    tags: string[],
    description: string,
    thumbnailImageUrl: string,
    createdAt: string;
    published: boolean;
  }
}

const BlogCard: React.FC<BlogCardProps> = ({ blogData }) => {
  const { triggerTransition } = usePageTransition();

  return (
    <div 
      onClick={() => {
        triggerTransition(`/blog/${blogData.slug}`)
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='w-full cursor-pointer mb-[60px] md:mb-0'
      >
        <img 
          src='/images/akisroom_thumbnail.webp'
          alt='tentative image here for test'
          className='object-cover w-full self-center rounded-xl md:rounded-2xl'
        />
        {/* 👇 Turn this back on once data and blogs are ready */}
        {/* { blogData.thumbnailImageUrl ?
            <img src={blogData.thumbnailImageUrl} alt={blogData.title} className='object-cover w-full self-center rounded-xl md:rounded-2xl'/>
          :
            <div className="h-[180px] w-full bg-neutral-300 md:col-span-1 md:col-start-1"></div>
        } */}
        <h3 className='text-[30px] text-left'>{ blogData.title }</h3>
        <div className='flex flex-wrap gap-x-[6px] gap-y-[5px] md:my-auto '>
          {blogData.tags.map((tag, index) => (
            <Tag tagName={tag} key={index}/>
          ))}
        </div>
        <p className='leading-[18px] text-[14px] text-left line-clamp-3 '>
          { blogData.description }
        </p>
        <p className='text-[14px] text-neutral-700 text-left'>Posted on: {blogData.createdAt}</p>
      </motion.div>
    </div>
  )
}

export default BlogCard
