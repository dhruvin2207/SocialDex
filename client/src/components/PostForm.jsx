import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [image, setImage] = useState(null);
  const [formInput, setFormInput] = useState({
    title: "",
    description: "",

  });

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const notify = (val) => toast.success(val);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('postImage', image);
    formData.append('title', formInput.title);
    formData.append('description', formInput.description);


    try {
      const request = await fetch("http://localhost:8000/posts/create-post", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
        body: formData,
      });

      const response = await request.json();
      notify(response.message);
      console.log(response);
      navigate('/'); // Redirect to home page after successful form submission
    } catch (error) {
      console.log(error);
      notify("An error occurred while submitting the form");
    }
  };

  const handleInput = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <section className='max-w-screen-2xl min-h-screen'>
      <div className='p-12 lg:px-56 xl:px-80 2xl:px-96 md:px-32 mt-7'>
        <form className='lg:p-8 p-4 grid grid-cols-1 gap-4' onSubmit={onSubmit} encType='multipart/form-data'>
          <h1 className='text-2xl text-center text-zinc-600 py-4 font-semibold'>Create Profile</h1>
          <input className='p-3 border-zinc-500 text-lg border bg-transparent  rounded-md text-zinc-600 focus:outline-none'
            name='title' type='text' placeholder='title' onChange={handleInput} />
          <input className='p-3 bg-transparent border border-zinc-500 rounded-md text-zinc-300 focus:outline-none'
            type='file' name='profileImage' placeholder='Post Image' onChange={e => setImage(e.target.files[0])} />

          <textarea className='p-3 border text-lg border-zinc-500 bg-transparent  rounded-md text-zinc-600 focus:outline-none'
            name='description' type='text' placeholder='what is on your mind today?' onChange={handleInput} />
          <input type='submit' className='px-6 py-2 rounded bg-violet-500 text-white font-semibold' />
        </form>
      </div>
    </section>
  );
};

export default PostForm;
