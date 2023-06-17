"use client" ;  // because we use React Hooks like useState , useEffect

import Link from "next/link" ;  // to can use links to navigate 
import Image from "next/image";   // to optimize the images 
import { useState, useEffect } from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react" ;  // to easily make sign in and sign out functons by power of next auth 




const Nav = () => {
   // const isUserLoggedIn = true ;   // static value to simulate login / logout 

   // here we rename data to session  from useSession Hooks
    const {data : session}  = useSession() ;  // here we missed()


    const [providers, setProviders] = useState(null) ;
    const [toggleDropdown, setToggleDropdown] = useState(false)




    

    useEffect(  () => {
                     const setUpProviders = async () => {
                     const response = await getProviders();
                     setProviders(response);
                  }
                  setUpProviders();  // here we must name this function any name except setProviders [because it used on useState() ]
              }
        , []);


/*
  =>  // here we use the function direclty
useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

*/


  return (
      <nav className="flex-between w-full mb-16 pt-3">
          <Link href="/" className="flex flex-center gap-2">
              <Image src="/assets/images/logo.svg"
                  alt="promptopia" width={30} height={30} className="object-contain" />
              <p className="logo_text">Promptopia</p>
          </Link>





          {/* Desktop Navigation */}
          <div className="sm:flex hidden">
              { session?.user  ? (
                  <div className="flex md:gap-5 gap-3" >
                      <Link href="/create-prompt" className="black_btn" >Create Post </Link>
                      <button type='button' onClick={() => { setToggleDropdown(false); signOut() }} className='outline_btn'>
                          Sign Out
                      </button>
                      <Link href="/profile" >
                        <Image 
                         src={session?.user.image}
                            width={30} 
                            height={30}
                            alt="Profile"
                            // to make accurate we use prev value for state 
                            onClick={ (prev) => setToggleDropdown(!prev )}
                            className='rounded-full'
                         />
                      </Link>
                  </div>
              ) :  (
                
                    <>
                      {providers &&
                        Object.values(providers).map((provider) => (
                          <button
                            type='button'
                            key={provider.name}
                            onClick={() => {
                              signIn(provider.id);
                            }}
                            className='black_btn'
                          >
                            Sign in
                          </button>
                        ))}
                    </>
             )}

          </div>


      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user  ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={30}
              height={30}
              className='rounded-full'
              alt='profile'
              // when click on image => toggle dropdown menu  on mobile view 
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      </nav>
  )
}

export default Nav ;
