import React, { useEffect, useState } from 'react';
import profileImg from '../assets/avatar.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"

const Profile = () => {
  const [profile, setProfile] = useState({})

  const user = useSelector(state => state.auth.user)

  const navigate = useNavigate()
  
  useEffect(() =>{
    const getProfile = async () => {
      try {
        const request = await fetch(`http://localhost:8000/profile/get-profile/${user.user?.id}`, {
          headers: {
            "Authorization": `Bearer ${user?.token}`
          }
        })
        const response = await request.json();
        setProfile(response)
      } catch (error) {
        console.log(error)
      }
    }

    getProfile()

    return () => {
      setProfile("")
    }

  },[user])

  console.log(profile)

  


  return (
    <section className='p-12 max-w-screen-2xl min-h-screen'>
      <div>
        <div className='flex gap-8'>
          <div className='flex flex-col gap-3'>
            <img className='h-32 object-cover rounded-full w-32' src={profile?.profileImage} alt='profle picture'/>
            <p className='Text-2xl font-medium text-yellow-50 tracking-wide'>{user? user.user?.username : " "}</p>
          </div>
          <div className='flex gap-4 items-center'>
            <p className='text-lg text-zinc-200'>Posts</p>
            <p className='text-lg text-zinc-200'>Followers</p>
            <p className='text-lg text-zinc-200'>Following</p>
          </div>
        </div>

        {/* bio */}
        <div className='my-4'>
          <ul className='my-3'>
            <li className='text-white'>{profile.occupation}</li>
            <li className='text-white'>{profile.location}</li>
            <li className='text-white'>{profile.bio}</li>
          </ul>
          <button onClick={() => navigate('/profile-form')} className='border text-white hover:text-violet-300 hover:border-violet-300 px-6 py-1 rounded-md'>Edit profile</button>
        </div>
        {/* images */}

        <div className='mt-4'>
          <h1 className='text-white border-b pb-1'>photos</h1>
          <div className='grid grid-cols-4'>
            <img src={profile.profileImage}/>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Profile
