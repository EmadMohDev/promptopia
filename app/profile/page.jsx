'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'
import { useRouter } from 'next/navigation'




const MyProfile = () => {

  const [posts, setPosts] = useState([])

  const { data: session } = useSession();

  const router = useRouter();  // to used later on navigation  after edit prompt


  // call when page load 
  useEffect(() => {
    // we put function here as we get error  session must be used on wrapper 
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`, { method: "GET" });
      const data = await response.json();
      setPosts(data);
    }

    if (session?.user.id) fetchPosts()    // to only fetch user posts only if user is login 
  }, [session?.user.id]);



  const handleEdit = async (post) => {
    console.log("handle user edit");
    // console.log(post);
    router.push(`/update-prompt?id=${post._id}`);


  }




  const handleDelete = async (post) => {
    console.log("handle user delete");
    // console.log(post);

    const hasConfirmed = confirm("are your sure to delete this prompt");

    if (hasConfirmed) {

      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        });

        console.log(response);

        if (response.ok) {
          const filterPosts = posts.filter(  (item) =>  item._id !== post._id  )  ;
          setPosts(filterPosts);
        }

      } catch (error) {
        console.log(error);
      }


    }

  }




  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      posts={posts}
      handleEdit={handleEdit}  // to enable to define Edit function on profile page and to be access on  Profile and  PromptCard components 
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile;