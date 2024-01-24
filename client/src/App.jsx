import { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Register from './components/Register'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'


function App() {
  

  return (
    <div className='bg-zinc-800 max-w-screen-2xl min-h-screen'>
      <Navbar/>
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element ={<Login/>}/>
    </Routes>
    </div>
  )
}

export default App
