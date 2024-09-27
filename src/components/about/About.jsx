import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { GiPostStamp } from "react-icons/gi";
import { GrSecure } from "react-icons/gr";
import { BiBookContent } from "react-icons/bi";
import Container from '../container/Container';
import { easeIn, easeInOut, easeOut, motion } from 'framer-motion';
function About() {
const aboutItems=[
    {
        icon:<FaUserFriends />,
        name:'User-Friendly Interface',
        content:'Our blog app is designed with a simple and intuitive interface, making it easy for users to create, edit, and manage their posts.'

    },
    {
        icon:<GiPostStamp />
        ,
        name:' Post Management',
        content:'With our powerful post management system, users can not only upload posts but also edit and delete them with ease.'

    },
    {
        icon:<GrSecure />
        ,
        name:' Secure Authentication',
        content:'Your security is our top priority. We provide a secure login and signup process, ensuring that your data and personal information are protected at all times. '

    },
    {
        icon:<BiBookContent />
        ,
        name:' Flexible Content Creation',
        content:'Our app offers a rich text editor that supports formatting, images, and more, allowing you to craft visually appealing posts '

    }
    
]

  return (
    <div className='w-full py-11 max-w-full border-t-[1px] border-t-black'>
           
<Container >
          
<h1 className=' text-center text-[2rem] md:text-[3rem] font-semibold tracking-wide font-Neue '>Top Values For You </h1>
            <h2 className=' text-[0.7rem] md:text-[1rem] font-Neue text-center capitalize'>Try Variety of benefits when using our services: </h2>
            <div  className='w-full flex pt-16 justify-center flex-wrap gap-10 lg:justify-between  items-start'>
    {
        aboutItems.map((item)=>(
          

            <motion.div
            initial={{opacity:0 , scale:0.7}}
           whileInView={{opacity:1, scale:1}}
          
            transition={{duration:1.2 , ease:"easeInOut"}}
           

            key={item.name} className='flex justify-center flex-col items-center gap-4'>
            <h1 className='w-[60px] h-[60px] flex items-center justify-center bg-black text-white rounded-full text-[1.6rem]'>{item.icon}</h1>
            <h1 className='font-Neue text-[1rem] font-semibold '>{item.name}</h1>
            <p className='font-Neue text-[0.8rem] text-center w-56 '>{item.content}</p>
            </motion.div>
               
        ))
    }
    </div>

</Container>
    
    </div>
  )
}

export default About