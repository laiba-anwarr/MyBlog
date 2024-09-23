import React, { useEffect, useState } from 'react'
import { useNavigate , useParams } from 'react-router-dom'
import databaseService from '../appwrite/Database'
import PostForm from '../components/Post/Post'
import LoadingSpinner from '../components/loading/LoadingSpinner'
function EditPost() {
const [post , setPost]=useState(null)
const {slug}=useParams()
const navigate =useNavigate()
const [loading , setLoading]=useState(true)
useEffect(()=>{
    if(slug){
        databaseService.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
                setLoading(false)
            }
        })
    }
    else{
        navigate('/')
    }
},[slug, navigate,loading])

if(loading){
    return(
        <LoadingSpinner />
    )
}
return post ?   (
    <PostForm post={post}/>
) :null
  
}

export default EditPost