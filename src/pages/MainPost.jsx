import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import postImage from '../assets/images/pexels-galerieb-1209982.jpg'
import Button from '../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/Database'
import { useSelector } from 'react-redux'
import storageService from '../appwrite/Storage'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';
import LoadingSpinner from '../components/loading/LoadingSpinner'
import { motion } from 'framer-motion'

function MainPost() {
    const [loading , setLoading]=useState(true)
    
    const [post , setPost]=useState(null)
    const {slug}= useParams()
    const navigate =useNavigate()
const userData= useSelector(state => state.auth.userData)

const isAuthor = post && userData ? post.UserId === userData.$id :false

    useEffect(()=>{
if(slug){
    databaseService.getPost(slug).then((post)=>{
        if(post)
           {
            setPost(post)
            setLoading(false)
     console.log(isAuthor)
     console.log(userData.$id)
           }
        
else 
   navigate('/all-posts')
    }
)
}
else{
navigate('/all-posts')
}
    }, [slug , navigate,])
    // ========================== delete post

    const deletePost=()=>{
        databaseService.deletePost(slug).then((status)=>
           {
            if(status) {
               storageService.deleteFile(post.FeaturedImage);
               navigate('/all-posts')
            }
           }
        )
    }
    if(loading){
        return(
            <LoadingSpinner />
        )
    }
  return (
    <div className='w-full overflow-hidden pb-10 flex flex-col md:flex-row  relative '>
       <Container>
 <div className=' flex flex-col xl:flex-row  w-full'>
 <div className='left h-full w-full xl:w-2/4 flex justify-center xl:block  pt-40   '>

<div className='bottom h-[280px]  w-[340px] bg-[#FFFFFF] relative flex items-end justify-center py-4' >
<div className='top h-[280px]  w-[340px]  absolute -top-24 -right-0 md:-right-32 '>
<motion.img 
initial={{opacity:0 , x:-300}}
animate={{opacity:1, x:0}}
transition={{duration:0.6 , delay:0.2, ease:"linear"}}
className='h-full w-full object-cover object-center'
src={storageService.getFilePreview(post.FeaturedImage)}
alt={post.Title}

/>

 </div>
 <div className='text-center'>
 <h2 className='capitalize font-cinzel text-[1.4rem] leading-[1.2rem] text-center font-bold tracking-widest pt-8'>{post.Title}</h2>
 <h4 className='font-cinzel text-[0.7rem] italic text-center font-[600] pt-1'> Blog Post</h4>
 </div>
</div>


</div>
<motion.div 
initial={{opacity:0 , x:300}}
animate={{opacity:1, x:0}}
transition={{duration:0.6 , delay:0.2, ease:"linear"}}
className='right pt-12 w-full xl:w-2/4 flex flex-col items-center'>
<h2 className='text-[0.9rem] font-Neue font-semibold text-center'>INTRODUCTION</h2>
<h1 className=' text-center text-[1.8rem] leading-[1.8rem] md:text-[3.4rem] md:leading-[3.4rem] font-bold font-Neue  tracking-widest'>{post.Title}</h1>
<hr className='h-[0.1rem] w-[18rem] bg-[#c7c3c3d7] text-center mx-auto mt-6 mb-4'/>
<div className='text-[1rem] font-Neue'>
{parse(post.Content)}
</div>
<hr className='h-[0.1rem] w-[18rem] bg-[#e0ddddd7] text-center mx-auto mt-6'/>

   {
    isAuthor && (
        <div className='mt-10 flex gap-4'>
        <Link to={`/edit-post/${slug}`}>
<Button
className='px-12 text-white bg-black'

>EDIT</Button>
</Link>
<Button className='px-12 text-white bg-black'
onClick={deletePost}
>DELETE</Button>
</div>
    )
   }
  

</motion.div>
 </div>


       </Container>
    </div>
  )
}

export default MainPost