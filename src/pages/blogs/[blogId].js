
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchUserBlogs } from '../../../firebase/firebase'
import { BlogCard } from '@/components/Cardblog'

const userBlog = () => {
    const [blogs,setBlogs] = useState([])
    const router = useRouter()
    const {blogId} = router.query
    useEffect(() => {
   if(blogId){
    fetchUserBlogs(blogId).then((data)=>{
      setBlogs(data)
      console.log(blogs)
            })
   }
      
    }, [blogId,blogs])
    
  return (
    <div  className='my-5 mx-10'>
      {blogs.map((blog) => (
        <BlogCard value={false} key={blog.id} data={blog} />
      ))}
    </div>
  )
}

export default userBlog
