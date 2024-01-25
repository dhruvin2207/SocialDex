import React, { useState } from 'react';
import { Menu, X , PlusSquare } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [open, setOpen] = useState(false)

  const user = localStorage.getItem('user')

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    setOpen(!open)
  }


  return (
    <div className='max-w-screen-2xl'>
      <header className='flex w-full justify-between px-4 py-3 items-center'>

        <div className=''>
            <h1 className='text-zinc-800 font-mono text-2xl font-semibold tracking-wide'>
              <Link to='/'>
              SocialDex
              </Link>
              </h1>
        </div>

      {/* buttons */}
      <div className='flex items-center gap-4'>
        <button onClick={() => navigate('/new-post')} className=' flex md:hidden items-center gap-3 text-zinc-700'>
            <PlusSquare size={30} />
        </button>
        <button onClick={() => setOpen(!open)} className='md:hidden flex items-center gap-3 text-zinc-700'>
            <Menu size={30}/>
        </button>
      </div>

        <nav className='hidden md:block'>
            <ul className='md:flex items-center  text-violet-950 text-vio space-x-4'>
              {!user? 
              <>
              <li className='text-zinc-800 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/register'>register</Link></li>
              <li className='text-zinc-800 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/login'>login</Link></li>
              </>
              : 
              <>
              <li onClick={() => navigate('/new-post')} className='text-zinc-800 transition-all duration-300 cursor-pointer hover:text-violet-900'><PlusSquare size={35}/></li>
              <li className='text-zinc-800 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/profile'>profile</Link></li>
              <li onClick={handleLogout} className='text-zinc-800 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/login'>logout</Link></li>
              </>
               }
            </ul>
        </nav>
      </header>

      <nav className={`absolute top-0 ${open? "translate-x-0": "translate-x-full"} transition-all duration-300 ease-out right-0 left-0 bottom-0 z-10 backdrop-blur-sm`}>
      <ul className='absolute drop-shadow-2xl z-10 tracking-wide right-0 flex flex-col px-4 py-14 text-xl gap-4 bg-zinc-300 w-[60%] bottom-0 top-0'>
      {!user? 
              <>
              <li onClick={() => setOpen(!open)} className='text-zinc-800 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/register'>register</Link></li>
              <li onClick={() => setOpen(!open)} className='text-zinc-800 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/login'>login</Link></li>
              </>
              : 
              <>
              
              <li onClick={() => setOpen(!open)} className='text-zinc-800 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/profile'>profile</Link></li>
              <li onClick={handleLogout} className='text-zinc-800 transition-all duration-300 cursor-pointer hover:text-violet-900'><Link to='/login'>logout</Link></li>
              </>
               }
            </ul>
            <button onClick={() => setOpen(!open)} className='absolute top-0 left-0 right-0 bottom-0'>
                <div className='absolute border rounded-lg p-1
                 bg-red-500 opacity-60 hover:opacity-80 text-zinc-200 top-3 left-3'>
                    <X size={30}/>
                </div>
            </button>
      </nav>
    </div>
  )
}

export default Navbar
