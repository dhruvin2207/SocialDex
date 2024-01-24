import React, { useEffect, useState } from 'react'
import Posts from '../components/Posts'
import PostCard from '../components/PostCard'

const Home = () => {
    const [posts, setPosts] = useState([])



    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        const fetchPosts = async () => {
            try {
                const request = await fetch("http://localhost:8000/posts/all-posts", {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                })

                const resonse = await request.json()
                console.log(resonse)
                setPosts(resonse)
            } catch (error) {
                console.log(error)
            }
        }

        fetchPosts()
    },[])



  return (
    <div className='px-3 max-w-sreen-2xl min-h-screen antialiased py-12'>
        <h1 className='text-lg italic text-zinc-400 tracking-wide text-center'>Your timeline</h1>
        <div>
      <Posts>
        {posts?.map(post => <PostCard key={post.id} title={post.title} createdAt={post.createdAt} description={post.description}/>)}
        {/* <PostCard/> */}
      </Posts>
        </div>
    </div>
  )
}

export default Home
