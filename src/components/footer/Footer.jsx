import React from 'react'
import Container from '../container/Container'
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const Footer = () => {
  return (
    <div className='w-full border-t-[1px] border-t-black pb-4 pt-16'>
      <Container >
     
        <h2 className='text-[1rem] font-Neue text-center font-medium capitalize'>Got a project? need an unfair advantage</h2>
       <div className='md:mb-24'>
       <motion.h1 
         initial={{opacity:0 , scale:0.8}}
         whileInView={{opacity:1, scale:1}}
          transition={{duration:1.2 , ease:"easeInOut"}}
       className='text-[2.8rem] tracking-wide leading-[4rem]   sm:text-[11rem] sm:leading-[11rem] md:text-[6rem] md:leading-[6rem]  lg:text-[8rem]  lg:leading-[8rem] md:-tracking-[5px] font-bold text-center uppercase'>GET IN T
        
        <span className='text-[#646464]'>o</span>UCH</motion.h1>
       </div>
       <hr className='h-[0.1rem] w-[18rem] bg-[#414040d7] text-center mx-auto mt-6'/>
       <div className='w-full pt-11 mt-2  flex items-center justify-center gap-4 mb-8 '>
       <h1 className='w-[40px] h-[40px] flex items-center justify-center bg-black text-white rounded-full text-[1.2rem]'><FaFacebookF /></h1>
       <h1 className='w-[40px] h-[40px] flex items-center justify-center bg-black text-white rounded-full text-[1.2rem]'><FaInstagram /></h1>
       <h1 className='w-[40px] h-[40px] flex items-center justify-center bg-black text-white rounded-full text-[1.2rem]'><FaTwitter /></h1>
       <h1 className='w-[40px] h-[40px] flex items-center justify-center bg-black text-white rounded-full text-[1.2rem]'><FaTelegramPlane /></h1>
        </div>
    
 
<p className='font-bold text-center '><span className='underline'>Contact us:</span> <a href="mailto:TheTechScripter@gmail.com">TheTechScripter@gmail.com</a></p>
        
<div className="copyright text-center text-[0.8rem] pt-3 font-Neue">
  &copy; {new Date().getFullYear()} MyBlogApp. All rights reserved.
  
</div>
 <Link to='/'>
  <h2 className='text-[1.2rem] font-semibold sm:text-[1.8rem]'>MyBlog</h2>
  </Link>
        </Container>
    </div>
  )
}

export default Footer