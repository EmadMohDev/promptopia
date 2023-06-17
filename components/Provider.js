"use client" ;  // as we use client browser for session 

import React from 'react'
import { SessionProvider } from 'next-auth/react'

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider