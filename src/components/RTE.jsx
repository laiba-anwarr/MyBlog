import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

function RTE({name, control , defaultValue ='Enter Your COntent ' , label}) {
    const apiKey='tnkeiff3iwfjsditjc2yow1s2qerg12tu9uayarbz5zakvpg'
  return (
    
    <div className='w-full'>
{label && (<label className='inline-block mb-1 pl-1'>{label}</label>)}
<Controller
name={name}
control={control}
render={({field : {onChange , value}})=>(
    <Editor 

       apiKey={apiKey}
   defaultValue={defaultValue}
      
init={
    {
        height:400,
        menubar:true,
        plugins:[
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
        ],
        toolbar:'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style:'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            
    }
}  
onEditorChange={(content) => onChange(content)}
    />
)}
/>

    </div>
  )
}

export default RTE