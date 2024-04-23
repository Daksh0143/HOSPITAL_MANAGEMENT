import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const responce = await axios.post("https://hospital-management-7lof.onrender.com/api/v1/user/patient/login",
        { email, password, confirmPassword, role: "Admin" }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success(responce.data.message)
      setIsAuthenticated(true),
        navigate("/")
    } catch (error) {
      console.log(error)
      toast.error(error.responce.data.message)
    }
  }

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className='container form-component'>
        <img src='/logo.png' alt='logo'/>
        <h1 className='form-title'>WELCOME TO ZEECARE</h1>
        <p>Only Admins Are Allowed to acess this resources</p>
        <form onSubmit={handleLogin}>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
          <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='confirmPassword' />
          
          <div style={{ justifyContent: 'center', alignItems: "center" }}>
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login