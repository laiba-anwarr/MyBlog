import React from 'react'
import { useId } from 'react'
import { forwardRef } from 'react'

const Input = forwardRef(function Input({
label,
type="text",
className="",
...props

},ref){
   const id=useId()
    return(
        <div className='w-full flex flex-col '>
            {
                label && (
                    <label
                     className=''
                     htmlFor={id}  >
{label}
                    </label>
                )
            }
            <input
            className='rounded-full py-[10px] mt-1 px-4 w-full  text-black bg-white '
            type={type}
            ref={ref}
            {...props}
            id={id}
            
            />
        </div>
    )
    
})

export default Input