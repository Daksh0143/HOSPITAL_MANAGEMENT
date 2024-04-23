import React, { useContext, useState } from 'react'
import {Context} from "../main"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const {isAuthenticated,setIsAuthenticated } =useContext(Context)
  const [email,setEmail] =useState()
  const [password,setPassword] =useState()
  const [confirmPassword,setConfirmPassword] =useState()
  const navigateTo=useNavigate()

  const handleLogin=async(e)=>{
    e.preventDefault()
    try {
      const responce=await axios.post("https://hospital-management-7lof.onrender.com/api/v1/user/patient/login",
      {email,password,confirmPassword,role:"Patient"},{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      toast.success(responce.data.message)
      setIsAuthenticated(true),
      navigateTo("/")
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error?.response?.data?.message)
    }
  }

  if(isAuthenticated){
    navigateTo("/")
  }

  return (
    <div className='container form-component login-form'>
      <h2>Sign in</h2>
      <p>Please login to continue</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error</p>
      <form onSubmit={handleLogin}>
        <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password'/>
        <input type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='confirmPassword'/>
        <div style={{gap:"10px",justifyContent:"flex-end",flexDirection:"row"}}>
            <p style={{marginBottom:0}}>Not Regitered</p>
            <Link to={"/register"} style={{textDecoration:"none" ,alignItems:"center"}}>Regiser Now</Link>
        </div>
        <div style={{justifyContent:'center',alignItems:"center" }}>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login