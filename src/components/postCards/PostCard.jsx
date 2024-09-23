import React from 'react'
import img from "../../assets/images/plaster-1128958_1280.jpg"
import storageService from '../../appwrite/Storage'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
function PostCard({post}) {
  const { $id, Title, FeaturedImage } = post;
  const imageUrl = FeaturedImage ? storageService.getFilePreview(FeaturedImage) : null
console.log($id, Title, FeaturedImage )
 
  return (
//    link remaining
// that $id will e used in link 
<Link to={`/post/${$id}`}>
<motion.div
 initial={{opacity:0 , scale:0.9}}
 animate={{opacity:1, scale:1}}
  transition={{duration:1.2 , ease:"easeInOut"}}
className=' w-[370px] h-[340px] bg-white shadow-lg hover:shadow-2xl'>
    <div className='h-[75%] px-3 pt-4'>
    {imageUrl ? (
            <img className='w-full h-full object-cover object-center' src={imageUrl} alt={Title} />
          ) : (
            <div className='w-full h-full bg-gray-200'>Image not available</div>
          )}
     {/* error occur due to missing file id at get preview file 
     so i am removing postcards from app 
     */}
    </div>
    <h2 className='capitalize font-cinzel text-[1.3rem] leading-[1.2rem] text-center font-semibold tracking-widest pt-8'>{Title}</h2>
<h4 className='font-cinzel text-[0.7rem] italic text-center font-[600] pt-1'> Blog Post</h4>
    </motion.div>        
</Link>
   
  )
}

export default PostCard