"use client" ;

import React, { useState } from 'react'
import Form from "@components/Form"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



const CreatePrompt = () => {

  const [post, setPost] = useState({prompt: "", tag: ""});  // to pass post empty on Create and with data on Update 


const [submitting , setSubmitting] = useState(false) ;  // to know the state of the form 

const { data : session } = useSession() ;
const router = useRouter() ;




const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  console.log("Submit the form ...");

  try {

     const response = await fetch("/api/prompt/new", {
       method :  "POST" , 
       body : JSON.stringify(
        {
          prompt : post.prompt , 
          tag : post.tag ,
          userId : session?.user.id
         }
       )
     }) ;
    
      if(response.ok){
        router.push("/") ;  // this not make refresh
      }

  } catch (error) {
    console.log(error);
  } finally {
    setSubmitting(false);
  }
  
}


  return (
    <Form 
      type="Create" 
      post={post}
      setPost= {setPost}
      submitting = {submitting} 
      handleSubmit = {handleSubmit}
     
      

    />
  )
}

export default CreatePrompt ;

