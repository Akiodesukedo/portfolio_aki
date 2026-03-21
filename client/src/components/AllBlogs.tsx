import React from 'react'
import BlogCard from '../molecules/BlogCard'


type Blog = {
  _id: string,
  title: string,
  slug: string,
  tags: string[],
  description: string,
  thumbnailImageUrl: string,
  createdAt: string;
  published: boolean;
}

type AllBlogsProps = {
  allBlogs: Blog[]
}

const AllBlogs: React.FC<AllBlogsProps> = ({ allBlogs }) => {
  return (
    <div className='mx-[30px] md:mx-[60px] mt-[100px] pb-[60px] md:pb-[100px] max-w-[1160px] xl:mx-auto md:grid md:grid-cols-2 md:gap-[48px] lg:grid-cols-3 lg:gap-[64px]'>
      {allBlogs.map((blog) => {
        return blog.published && 
          (
            <div key={blog._id}>
              <BlogCard blogData={blog}/>
            </div>
          )
      })}
    </div>
  )
}

export default AllBlogs
