"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'


const PromptCardsList = ({ data, handleTagClick}) => {

  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map((post) => (

          <PromptCard post={post} key={post._id}      handleTagClick={handleTagClick}   />
        ))
      }

    </div>

  );

}



const Feed = () => {

  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState([])
  const [searchTimeout, setsearchTimeout] = useState(null)   // to handle debounced  mechanism  = delay search functionality to certain time to prevents frequent search calls 
  // search triggered after a brief delay (500 milliseconds) once the user stops typing

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt", { method: "GET" });
    const data = await response.json();
    setPosts(data);
  }

  // call when page load 
  useEffect(() => {
    fetchPosts()
  }, []);


  const handleSearchChange = (e) => {

    clearTimeout(searchTimeout)  ;  // to clear any timeout
    setSearchText(e.target.value);

   /// console.log("search start");
    // before search we will add debounced  mechanism

    setsearchTimeout(
      setTimeout(   () =>{
        const filterPosts = filterPrompts(e.target.value);
        setSearchedResults(filterPosts);
      //   console.log("search  actual start");


      } , 500) 
    );

    
  }







  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i")   //  'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.prompt) ||
        regex.test(item.tag) ||
        regex.test(item.creator.username)

    );
  };



  const handleTagClick =  (tagName)=>{
   // console.log("tag is clicked");
    setSearchText(tagName);
    const filterPosts = filterPrompts(tagName);
    setSearchedResults(filterPosts);
  }


  return (

    <section className='feed'>


      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {

        searchText ? (
          <PromptCardsList data={searchedResults}  handleTagClick={handleTagClick} />
        ) : (
          <PromptCardsList data={posts}    handleTagClick={handleTagClick} />
        )

      }
    </section>
  )
}

export default Feed