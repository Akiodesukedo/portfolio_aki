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
        className='w-full md:grid md:grid-cols-2 lg:grid-cols-[500px_auto] gap-[12px] md:gap-x-[24px] lg:gap-x-[36px] md:grid-rows-[auto_auto_1fr_auto] cursor-pointer pt-[50px] pb-[40px] border-b-1 border-black'
      >
        <div className='flex flex-nowrap justify-between items-center mb-[12px] md:col-span-1 md:col-start-2 md:mb-0'>
          <h3 className='text-[30px] text-left'>{ blogData.title }</h3>
          <p className='text-[14px] text-neutral-700'>Posted on: </p>
        </div>
        { blogData.thumbnailImageUrl ?
            <img src={blogData.thumbnailImageUrl} alt={blogData.title} className='object-cover w-full md:col-span-1 md:col-start-1 md:row-span-4 md:row-start-1 self-center'/>
          :
            <div className="h-[180px] w-full bg-neutral-300 md:col-span-1 md:col-start-1"></div>
        }
        <div className='flex flex-wrap gap-x-[6px] gap-y-[5px] mt-[26px] mb-[20px] md:col-span-1 md:col-start-2 md:my-auto '>
          {blogData.tags.map((tag, index) => (
            <Tag tagName={tag} key={index}/>
          ))}
        </div>
        <p className='leading-[18px] text-[14px] text-left md:col-span-1 md:col-start-2'>
          { blogData.description }
        </p>
        <p className='text-[18px] text-right font-semibold md:col-span-1 md:col-start-2 pt-[16px] md:pt-0'>
          Read more &gt;&gt;
        </p>
      </motion.div>
    </div>
  )
}

export default BlogCard
