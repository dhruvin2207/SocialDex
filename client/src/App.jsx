import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Register from './components/Register'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import ProfileForm from './components/ProfileForm';
import { setUser } from './state/user.slice';
import {  useDispatch } from "react-redux"


function App() {

  const dispatch =  useDispatch()

  
  useEffect(() => {
    const payload = JSON.parse(localStorage.getItem("user"))
    if(payload) {
      dispatch(setUser({ user: payload }))
    }
  },[dispatch])
  

  return (
    <div className='bg-zinc-800 max-w-screen-2xl min-h-screen'>
      <Navbar/>
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile-form' element={<ProfileForm/>}/>
      </Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element ={<Login/>}/>
    </Routes>
    </div>
  )
}

export default App
