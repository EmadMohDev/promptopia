import React from 'react'
import PromptCard from './PromptCard';


const PromptCardsList = ({ data, handleEdit, handleDelete }) => {

  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map((post) => (

          <PromptCard
            post={post}
            key={post._id}
            handleEdit={() =>  handleEdit && handleEdit(post)  }  // as handleEdit property is optional (can send or not)
            handleDelete={() =>  handleDelete && handleDelete(post) }   // as handleEdit property is optional (can send or not)

          />
        ))
      }

    </div>

  );

}


const Profile = ({ name, desc, posts, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      {

        <PromptCardsList
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      }
    </section>

  )
}

export default Profile