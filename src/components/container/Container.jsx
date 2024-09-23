import React from 'react'

function Container({children}) {


  return  <div className='w-full max-w-screen-2xl px-4 sm:px-12'>
    {children}
  </div>;
  
}

export default Container