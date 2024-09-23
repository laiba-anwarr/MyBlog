import React from 'react'

const Button = ({
    children,
    type= "submit",
    backgroundColor= "",
    textColor="",
    className = "",
    ...props
}) => {
  return (
    // remaining used props  in button
<button className={` bg-[#646464] rounded-full hover:shadow-2xl  ${backgroundColor} ${textColor} py-[10px] ${className} ` } type={type} {...props} >
    {children}
</button> 
  )
}

export default Button