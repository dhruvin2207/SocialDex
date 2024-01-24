import React from 'react';
import moment from 'moment';
import { Heart, MessageCircle } from "lucide-react"

const PostCard = ({ title, description, createdAt }) => {
  return (
    <section className='p-4 drop-shadow-xl bg-zinc-700 rounded'>
      <div className=''>
        <h1 className='text-lg font-semibold text-zinc-300 tracking-wide'>{title}</h1>
        <p className='text-zinc-400 py-2 leading-snug'>{description}</p>
        <div className='flex gap-5 py-3 items-center text-zinc-300'>
            <Heart/>
            <MessageCircle />
        </div>
        <p className='text-zinc-500 italic'>{moment(createdAt).startOf("hour").fromNow()}</p>
      </div>
    </section>
  )
}

export default PostCard


