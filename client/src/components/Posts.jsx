import React from 'react'

const Posts = ({ children }) => {
  return (
    <section className='max-w-screen-2xl min-h-screen'>
      <div className='p-3 grid grid-cols-1 gap-4'>
            {children}
      </div>
    </section>
  )
}

export default Posts
