import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/Auth'
import { logout } from '../../store/authSlice'
import LoadingSpinner from '../loading/LoadingSpinner'
import { useNavigate } from 'react-router-dom'
function Logout() {
const dispatch= useDispatch()

const navigate=useNavigate()
const logoutHandler=()=>{
 
    authService.logOut().then(()=>{
        dispatch(logout())
       navigate('/')
    })
}


  return (
    <button
    onClick={logoutHandler}
    className='cursor-pointer text-[1rem] sm:text-[1.1rem] '>Logout</button>
  )
}

export default Logout