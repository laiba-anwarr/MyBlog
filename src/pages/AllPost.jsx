import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/postCards/PostCard'
import databaseService from '../appwrite/Database'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/loading/LoadingSpinner'
function AllPost() {
  const [loading , setLoading]=useState(true)
const [posts , setPosts]=useState([])
    useEffect(()=>{
databaseService.getPosts([]).then((posts)=>{
    if(posts){
        setPosts(posts.documents)
      
     setLoading(false)
    }
})
},[])

  return (
    <>
    {
      loading ? (<LoadingSpinner />) :(
        <div className='w-full max-w-screen-2xl  bg-[#EDEDED] pt-5 pb-16'>
   
         <div className=''>
            <h2 className='text-[0.8rem] md:text-[1.3rem] font-Neue text-center tracking-[0.6rem]'>Bloggers</h2>
            <h1 className=' text-center text-[1.8rem] leading-[1.8rem] md:text-[3.4rem] md:leading-[3.4rem] tracking-widest font-lora '>ALL BLOG POSTS </h1>
         </div>
         <div className='pt-20 flex justify-center flex-wrap gap-6 postcards '>
           {
           posts.length > 0 ? (
            posts?.map((post)=>(
              <div key={post.$id} className=''>
                  <PostCard post={post}
                  // or post ={post}
// maybe error here
/>
              </div>

          ))
           ):(
            <p className='text-center text-[1.5rem] font-Neue'>No posts available. Start your
            <Link to='/add-post' >
           <span className='underline text-[#0e0909]'> new post!</span>
            </Link>
            </p>
           )
           }
           
         </div>
  
        </div>
      )
    }
    </>
  )
}

export default AllPost