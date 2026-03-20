import React from 'react'
import BlogCard from '../molecules/BlogCard'


type Blog = {
  _id: string,
  title: string,
  slug: string,
  tags: string[],
  description: string,
  thumbnailImageUrl: string,
}

type AllBlogsProps = {
  allBlogs: Blog[]
}

const AllBlogs: React.FC<AllBlogsProps> = ({ allBlogs }) => {
  return (
    <div className='mx-[30px] md:mx-[60px] mt-[100px] pb-[60px] max-w-[1160px] xl:mx-auto'>
      {allBlogs.map((blog) => (
        <div key={blog._id}>
          <BlogCard blogData={blog}/>
        </div>
      ))}
    </div>
  )
}

export default AllBlogs
