import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../container/Container'
import doted from "../../assets/images/pngfind.com-polka-dot-png-218295(1).png"
import { useDispatch, useSelector } from 'react-redux'
import Logout from './Logout'
import { motion } from 'framer-motion';
import { setAnimationComplete } from '../../store/animationSlice'
const Header = () => {
const activeStatus=useSelector(state => state.auth.status)
const dispatch =useDispatch()
const navigate =useNavigate()
  const navItems=[
    {
      name:"Home",
      slug:"/",
      status:true
    },
    {
      name:"Login",
      slug:"/login",
      status:!activeStatus
    },
    {
      name:"Signup",
      slug:"/signup",
      status:!activeStatus
    },
    {
      name:"AllPosts",
      slug:"/all-posts",
      status:activeStatus
    },
    {
      name:'AddPosts',
      slug:"/add-post",
      status:activeStatus
    }
  ]

  return (
<header className='py-4  w-full relative z-[200] bg-[#FAFAFA]  '>
<Container>
<nav className=' w-full flex   items-center  justify-between'>
  <motion.div
   initial={{ opacity: 0, y:-20 }}
   animate={{ opacity: 1, y:0}}
  
   transition={{ 
     duration: 0.6, 
     
      // smooth easeInOut
      ease: [0.42, 0, 0.58, 1]
   }}
  >
  <Link to='/'>
  <h2 className='text-[1.2rem] font-semibold sm:text-[1.8rem]'>MyBlog</h2>
  </Link>
  </motion.div>
 
  <div className='h-10  flex gap-28 md:gap-16  items-center'>
  <ul className='  flex  gap-3   sm:gap-6 ' >
   
    {
      navItems.map((item , index)=>(
       item.status ? (
        <motion.li key={item.name}
        initial={{opacity:0 , y:-20}}
        animate={{opacity:1 , y:0}}

        transition={{delay: 0.6 + index*0.3 ,  ease: [0.42, 0, 0.58, 1] , duration: 0.6}}
        onAnimationComplete={()=> {
        if(!activeStatus){
          dispatch(setAnimationComplete(true))
          console.log('Animation complete dispatched');
        }  
        
        }
        }
        >
       <Link to={item.slug}>
       <button 
      className='cursor-pointer text-[1rem] sm:text-[1.1rem] '>{item.name}</button>
       </Link>
      </motion.li>

       ):null
      ))
    }
    {
      activeStatus ? (
        <motion.li
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay:0.6 + navItems.length*0.3,   ease: [0.42, 0, 0.58, 1] , duration: 0.6,}}
        onAnimationComplete={()=> {dispatch(setAnimationComplete(true))
          console.log('Animation complete dispatched');}
        }
        ><Logout /></motion.li>
      ) :null
    }
    
  </ul>
<img className='h-full w-full object-cover object-center hidden md:block '
 src={doted} />
  </div>
</nav>
</Container>

</header>
  )
}

export default Header