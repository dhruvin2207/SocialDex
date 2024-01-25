import React, { useEffect, useState } from 'react';
import Posts from '../components/Posts';
import PostCard from '../components/PostCard';
import { Audio } from 'react-loader-spinner';
import FadeLoader from "react-spinners/FadeLoader";


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        const fetchPosts = async () => {
            try {
                const request = await fetch("http://localhost:8000/posts/all-posts", {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });

                const response = await request.json();
                setPosts(response.reverse());
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("Error fetching posts");
                setLoading(false);
            }
        };

        // Only fetch posts on initial load
        if (loading) {
            fetchPosts();
        }
    }, [loading]);

    console.log(posts)

    return (
        <div className='max-w-sreen-2xl min-h-screen antialiased py-3'>
            <h1 className='text-lg italic text-zinc-400 py-3 tracking-wide text-center'>Your timeline</h1>

            {loading &&
            <div className='grid mt-40 place-items-center'>
                    <FadeLoader
                    color="green"
                    loading={loading}
                    //   cssOverride={override}
                    size={80}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
            </div>
              }
            {/* {error && <p>Error: {error}</p>} */}

            {!loading && !error && (
                <Posts>
                    {posts.map(post => (
                        <PostCard key={post.id} posterImage={post?.userImage} author={post.user?.username} title={post.title} src={post.postImage} createdAt={post.createdAt} description={post.description} />
                    ))}
                </Posts>
            )}
        </div>
    );
};

export default Home;
