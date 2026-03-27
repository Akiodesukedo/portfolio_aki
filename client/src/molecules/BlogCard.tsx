import React from 'react'
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

  const rawCreatedData = new Date(blogData.createdAt)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: "short",
    day: "numeric"
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(rawCreatedData);

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
        { blogData.thumbnailImageUrl ?
            <img src={blogData.thumbnailImageUrl} alt={blogData.title} className='object-cover w-full self-center rounded-xl'/>
          :
            <div className="h-[180px] w-full bg-neutral-300 md:col-span-1 md:col-start-1"></div>
        }
        <div className='flex flex-wrap gap-x-[6px] gap-y-[5px] mt-[8px]'>
          {blogData.tags.map((tag, index) => (
            index === blogData.tags.length - 1 ?
            <p key={index} className='text-gray-600 text-[12px]'>
              {tag}
            </p>
            :
            <p key={index} className='text-gray-600 text-[12px]'>
              {tag} /&thinsp;
            </p>
          ))}
        </div>
        <h3 className='text-[24px] leading-[28px] font-semibold text-left mt-[8px] mb-[8px]'>{ blogData.title }</h3>
        <p className='leading-[18px] text-[12px] text-left line-clamp-3 mb-[8px]'>
          { blogData.description }
        </p>
        <p className='text-[12px] text-neutral-700 text-left'>Posted on: {formattedDate}</p>
      </motion.div>
    </div>
  )
}

export default BlogCard
