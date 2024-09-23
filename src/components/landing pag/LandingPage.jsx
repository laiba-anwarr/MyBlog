import React, { useState } from 'react'
import landingImage from "../../assets/images/image-Photoroom1.png"
import Header from '../header/Header'
import Container from '../container/Container'
import { Link } from 'react-router-dom'
import Button from '../Button'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../loading/LoadingSpinner'
import { easeOut, motion } from 'framer-motion'
import { GiDuration } from 'react-icons/gi'

function LandingPage() {
const [loading , setLoading]=useState(true)
  const userData=useSelector(state => state.auth.userData)
  const status =useSelector(state=> state.auth.status)
  const animationStatus =useSelector(state => state.animation.animationComplete)
  
  React.useEffect(() => {
    // Simulate user data fetching process or API call
    if (status !== undefined) {
      // If userData is available, stop loading
      setLoading(false);
     
    }
    console.log(animationStatus)
  }, [ status]);
if(loading){
  return (
    <LoadingSpinner />
  )
}
// ==================== animation varients
const variants = {
  hidden: {
    opacity: 0,
    x: -200,
  },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.5,
      duration: 0.8,
      ease: "linear"
    },
  }),
  scale: {
    hidden: {
      scale: 0,
    },
    visible: (custom) => ({
      scale: 1,
      transition: {
        delay: custom * 0.5,
        duration: 1,
        ease:easeOut
      },
    }),
  },
};



  return (
 <main 
 className='w-full font-Founders overflow-hidden max-w-screen-2xl pb-14 bg-[#FAFAFA] '>
  
 
  <div

  className='absolute  z-[200] h-[34vh]   md:h-[33vh] lg:h-[44vw] xl:h-[37vw] xl:top-[23vw]  top-[26vh] md:top-[32vw] lg:top-[20rem] left-[48%] md:left-[48%]  lg:left-[46%]  xl:left-[46%] -translate-x-[50%] -translate-y-[50%]  '>
    <motion.img
    variants={variants.scale}
    initial='hidden'
    animate='visible'
    custom={3}
    className='h-full  max-w-full" '
     src={landingImage} /> 

   </div>


   {/* sm:pt-[1rem]  */}
<Container >
  <div className='  pt-[4rem]sm:pt-[2.6rem] relative text-[#646464]'>
  <motion.div
  variants={variants}
  initial='hidden'
animate={animationStatus ? 'visible' :'hidden'}
custom={1}
  
  >
   <h2 className=' text-[2.1rem] leading-[2.1rem] sm:text-[3rem] sm:leading[2.5rem] md:text-[3.8rem] tracking-[0.2rem] md:leading-[3rem]'>
      NEW
    </h2>
   </motion.div>
    <motion.div
    variants={variants}
    initial='hidden'
    animate={animationStatus ? 'visible' : 'hidden'}
    custom={1}
    className='w-full'>
      <h1 className='text-[7rem] leading-[5rem] text-[#646464]  sm:text-[11rem] sm:leading-[11rem] md:text-[10.5rem] md:leading-[8rem]  lg:text-[18rem]  lg:leading-[12rem] tracking-wide'>My BLOGGER</h1>
    </motion.div>
   <motion.div
   variants={variants}
   initial={{opacity:0 ,x:200}}
   animate={animationStatus ? 'visible':null }
   custom={3}
   className=' mt-2 md:mt-2 sm:mt-6 lg:mt-8'>
    <h2 className='text-right text-[2.1rem] leading-[2.1rem] text-[#646464] sm:text-[3rem] sm:leading[2.5rem] md:text-[3.8rem] tracking-[0.2rem] md:leading-[3rem]'>APP</h2>
   </motion.div>
  <div className='pt-[1rem] md:pt-[5rem]  '> 
  {
    status ? (
      <Link to='/all-posts'>
    
       <h2 className='text-[0.9rem] text-[black] md:text-[1.2rem] z-[300] relative font-Neue  cursor-pointer tracking-wide font-extrabold  '>Explore Posts 
   
   
   </h2>
      
      </Link>
    ):(
      <Link to='/signup'>
     
       <h2 className='text-[0.9rem] text-[black] md:text-[1.2rem] z-[300] relative font-Neue  cursor-pointer tracking-wide u font-extrabold '>Sign Up to see Posts 
   
   
   </h2>
      
      </Link>
      
    )
  }
  </div>
  </div>
</Container>
 </main>
  )
}

export default LandingPage