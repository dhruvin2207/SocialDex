import React from 'react';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom'


const shema = yup.object({
    email: yup.string().required(),
    password: yup.string().required()
})

const Login = () => {
    const { handleSubmit, register } = useForm({
        resolver: yupResolver(shema)
    })

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
          const request = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type":  "application/json"
            },
            body: JSON.stringify(data)
          })

          const response = await request.json()
          localStorage.setItem("user", JSON.stringify(response))
          if(response.status === "bad") {
            toast.error(response.message, {
              style: {
                border: '1px solid red',
                padding: '4px 8px',
                color: 'white',
                backgroundColor: 'transparent'
              },
            })
            return
          }
          navigate('/')
          console.log(response)
        } catch (error) {
          console.log(error) 
        }
    }



  return (
    <section className='max-w-screen-2xl min-h-screen'>
      <Toaster/>
      <div className='p-12 lg:px-60 xl:px-80 2xl:px-96 md:px-32 mt-7'>
        <form className='lg:p-8 p-4 grid grid-cols-1 gap-4' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-2xl text-center text-orange-100 py-4 font-semibold'>Login</h1>
            <input className='p-3 bg-transparent border border-zinc-500 rounded-md text-zinc-300 focus:outline-none' type='email' placeholder='Email' {...register("email")}/>
            <input className='p-3 bg-transparent border border-zinc-500 rounded-md text-zinc-300 focus:outline-none' type='password' placeholder='password' {...register("password")}/>
            <input type='submit' className='px-6 py-2 rounded bg-violet-500 text-white font-semibold'/>
            <p className='text-violet-100'>Dont  have an account? <Link className='underline text-violet-600' to='/register'>Register</Link></p>
        </form>
      </div>
    </section>
  )
}

export default Login
