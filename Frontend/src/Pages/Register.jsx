import React, { useContext, useState } from 'react'
import { Context } from "../main"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [nic, setNic] = useState()
  const [dob, setdob] = useState()
  const [gender, setGender] = useState()
  const [password, setPassword] = useState()

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const responce=await axios.post("https://hospital-management-7lof.onrender.com/api/v1/user/patient/register",
      {firstName,lastName,email,phone,nic,dob,gender,password,role:"Patient"},
      {withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }})
      toast.success(responce.data.message)
      navigateTo("/login")
      isAuthenticated(true)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  if (!isAuthenticated) {
    navigateTo("/login")
  }

  return (
    <div className='container form-component register-form'>
      <h2>Sign Up</h2>
      <p>Please sign up to Continue</p>
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
        voluptas expedita itaque ex, totam ad quod error?
      </p>
      <form onSubmit={handleRegister}>
        <div>
          <input type='text' placeholder='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type='text' placeholder='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='number' placeholder='phone number' value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <input type='number' placeholder='NIC' value={nic} onChange={(e) => setNic(e.target.value)} />
          <input type='date' placeholder='Date of Birth' value={dob} onChange={(e) => setdob(e.target.value)} />
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option>select Gender</option>
            <option value="Male">MALE</option>
            <option value="Female">FEMALE</option>
          </select>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
          <p style={{ marginBottom: 0 }}>Already Registered</p>
          <Link to={"/login"} style={{ textDecoration: "none", alignItems: "center" }}>Login Now</Link>
        </div>
        <div style={{ justifyContent: 'center', alignItems: "center" }}>
          <button type='submit'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register