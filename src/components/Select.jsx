import React, { useId } from 'react'

function Select({
    label,
    options,
    className=' ',
...props

}, ref) {
    const id=useId()
  return (
    <div className='w-full bg-white rounded-full  py-[10px] mt-1 px-4'>
        {
            label && (
                <label className='w-full '
                htmlFor={id}
                >
                </label>

            )
        }
        <select>
            {
                options?.map((option)=>
(
    <option key={option} value={option}
     className={`${className}`}
    id={id}
    ref={ref}
    {...props}
    >
        {option}

    </option>
)
            )
            }
        </select>
        
    </div>
  )
}

export default React.forwardRef(Select)