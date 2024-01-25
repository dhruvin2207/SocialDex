import React, { useEffect, useState  } from 'react';
import moment from 'moment';
import { Heart, MessageCircle, BadgeCheck } from "lucide-react";
import { useSelector } from "react-redux";
import ImageComponent from './ImageComponent';


// ... (same imports)

const PostCard = ({ title, author, posterImage, description, createdAt, src }) => {
  return (
      <section className='md:px-36 max-w-screen-2xlpx-3'> {/* Added margin-bottom */}
          <div className='border border-zinc-800 p-2'>
              {/* First div */}
              <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-4'>
                      <img className='h-14 object-cover rounded-full w-14' src={posterImage} alt="Author" />
                      <p className='text-lg font-semibold text-zinc-800'>{author}</p>
                      <p className='text-blue-600'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                              {/* ... (same SVG path) */}
                          </svg>
                      </p>
                  </div>
                  <button className='border text-zinc-800 border-zinc-800 px-6 rounded'>Follow</button>
              </div>
              {/* Second div */}
              <div>
                  <h1 className='text-xl text-zinc-800 font-medium py-5'>{title}</h1>
              </div>
              {/* Third div -image */}
              <div className='overflow-hidden'>
                  {/* <img className=' object-cover' src={src}/> */}
                  <ImageComponent image={src} />
              </div>
              {/* Description */}
              <div className='my-3'>
                  <p className='text-lg tracking-wide'>{description}</p>
              </div>
              {/* Fourth div */}
              <div className='flex my-3 items-center gap-4'>
                  <Heart size={30} />
                  <MessageCircle size={30} />
              </div>
              {/* Fifth div - time */}
              <div className='pb-3'>
                  <p className='italic text-zinc-400'>{moment(createdAt).startOf().fromNow()}</p>
              </div>
          </div>
      </section>
  );
}

export default PostCard;
