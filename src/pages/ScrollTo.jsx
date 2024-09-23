import { path } from 'framer-motion/client'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
function ScrollTo() {
    const {pathname}=useLocation()
    useEffect(()=>{
        window.scrollTo(0,0)
            },[pathname])
  return null;
}

export default ScrollTo