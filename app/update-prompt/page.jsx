"use client" ;

import React, { useState , useEffect } from 'react'
import { useRouter , useSearchParams} from 'next/navigation';
import Form from "@components/Form"



const UpdatePrompt = () => {


const [post, setPost] = useState({prompt: "", tag: ""});  // to pass post empty on Create and with data on Update 

const [submitting , setSubmitting] = useState(false) ;  // to know the state of the form 

const router = useRouter() ;

const searchParams = useSearchParams(); 
const promptId = searchParams.get("id") ; 
  // to get id  from a link ex:  http://localhost:3000/update-prompt?id=646c7871f556f836f0149547



    // to fetch current prompt data 
    useEffect(() => {
        // we put function here as we get error  session must be used on wrapper 
       const fetchPost = async (req) => {
         const response = await fetch(`/api/prompt/${promptId}`, { method: "GET" });  
         // to fetch data from post edit page  ex:  http://localhost:3000/update-prompt?id=646c7871f556f836f0149547
         const data = await response.json();

         // console.log(data);

         setPost({
            prompt : data.prompt ,
            tag : data.tag
         });
       }
   
       if(promptId)  fetchPost()    // to only fetch user posts only if user is login 
     }, [promptId ]);   // this useEffect() Hooks will fire only if there is promptId on Url 
   



  

const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("Edit Prompt form ...");

    if(! promptId)  return alert("Missing prompt id") 
  
    try {
  
       const response = await fetch(`/api/prompt/${promptId}`, {
         method :  "PATCH" , 
         body : JSON.stringify(
          {
            prompt : post.prompt , 
            tag : post.tag ,
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
    type="Update" 
    post={post}
    setPost= {setPost}
    submitting = {submitting} 
    handleSubmit = {handleSubmit}
   
    

  />
  )
}

export default UpdatePrompt ;
