'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'
import { useRouter, userSearchParams, useSearchParams } from 'next/navigation'

// this page represent a route like :  http://localhost:3000/profile/64649ba3e17d864938832d4f?name=emadmohamed

const UserProfile = ({params}) => {


console.log(params);

  const [posts, setPosts] = useState([])

  const { data: session } = useSession();

  const router = useRouter();  // to used later on navigation  after edit prompt


const searchParams = useSearchParams();
const userName = searchParams.get("name") ;  // to get name for query parameter on url  ?name=...
  
// call when page load 
useEffect(() => {
  // we put function here as we get error  session must be used on wrapper 
  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${params?.id}/posts`, { method: "GET" });  
    // params?.id   => to get id on url  ex: http://localhost:3000/profile/64649ba3e17d864938832d4f
    const data = await response.json();
    setPosts(data);
  }

  if (params?.id) fetchPosts()    // to only fetch user posts only if user is login 
}, [params?.id]);


const desc = `Welcome to ${userName}'s personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination` ;


  return (
    <Profile
    name={userName}
    desc={desc}
    posts={posts}
  />
  )
}

export default UserProfile