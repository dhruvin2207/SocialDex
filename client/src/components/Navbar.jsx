import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [open, setOpen] = useState(false)

  const user = localStorage.getItem('user')

  const handleLogout = () => {
    localStorage.removeItem('user')
    setOpen(!open)
  }


  return (
    <div className='max-w-screen-2xl'>
      <header className='flex w-full drop-shadow-lg justify-between px-8 py-3 items-center'>

        <div className=''>
            <h1 className='text-zinc-300 text-3xl font-semibold tracking-wide'>
              <Link to='/'>
              SocialDex
              </Link>
              </h1>
        </div>

        <button onClick={() => setOpen(!open)} className='md:hidden text-zinc-200'>
            <Menu size={30}/>
        </button>

        <nav className='hidden md:block'>
            <ul className='md:flex items-center  text-violet-950 text-vio space-x-4'>
              {!user? 
              <>
              <li className='text-slate-400 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/register'>register</Link></li>
              <li className='text-slate-400 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/login'>login</Link></li>
              </>
              : 
              <>
              <li className='text-slate-400 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/profile'>profile</Link></li>
              <li onClick={handleLogout} className='text-slate-400 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/login'>logout</Link></li>
              </>
               }
            </ul>
        </nav>
      </header>

      <nav className={`absolute top-0 ${open? "translate-x-0": "translate-x-full"} transition-all duration-300 ease-out right-0 left-0 bottom-0 z-10 backdrop-blur-sm`}>
      <ul className='absolute drop-shadow-2xl z-10 tracking-wide right-0 flex flex-col px-4 py-14 text-xl gap-4 bg-zinc-800 w-[60%] bottom-0 top-0'>
      {!user? 
              <>
              <li onClick={() => setOpen(!open)} className='text-slate-400 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/register'>register</Link></li>
              <li onClick={() => setOpen(!open)} className='text-slate-400 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/login'>login</Link></li>
              </>
              : 
              <>
              <li onClick={() => setOpen(!open)} className='text-slate-400 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/profile'>profile</Link></li>
              <li onClick={handleLogout} className='text-slate-400 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/login'>logout</Link></li>
              </>
               }
            </ul>
            <button onClick={() => setOpen(!open)} className='absolute top-0 left-0 right-0 bottom-0'>
                <div className='absolute text-zinc-200 top-3 left-3'>
                    <X size={30}/>
                </div>
            </button>
      </nav>
    </div>
  )
}

export default Navbar
