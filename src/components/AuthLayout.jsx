import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({children , authentication = true,}) {
const authStatus =useSelector(state => state.auth.status )
const [loader , setLoader]=useState(true)
const navigate = useNavigate()
useEffect(()=>{
let authValue = authStatus === true ? true : false

if (authentication && authValue){
    navigate("/")
}
else if(!authentication && !authValue ) {
    navigate("/login")
}
setLoader(false)

}, [navigate , authentication, authStatus , authValue])


  return   loader ? (<h1>Loading .....</h1>) :<>
  {children}
  </>
}

export default AuthLayout