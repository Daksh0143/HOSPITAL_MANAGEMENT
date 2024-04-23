import React, { useState, useContext } from 'react'
import { Context } from "../main"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { toast } from 'react-toastify'
import toast from 'react-hot-toast'


const AddNewAdmin = () => {
  const { isAuthenticated} = useContext(Context)
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [nic, setNic] = useState()
  const [dob, setdob] = useState()
  const [gender, setGender] = useState()
  const [password, setPassword] = useState()

  const navigateTo = useNavigate()


  const handleAddNewAdmin = async (e) => {
    e.preventDefault()
    try {
       const response = await axios.post("https://hospital-management-7lof.onrender.com/api/v1/user/admin/addNewAdmin",
        { firstName, lastName, email, phone, nic, dob, gender, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        })
      toast.success(response.data.message)
      navigateTo("/")
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setdob("");
      setGender("");
      setPassword("");

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  if (!isAuthenticated) {
    navigateTo("/login")
  }
  return (
    <section className='page'>
      <div className='container form-component add-admin-form'>
        <img src='/logo.png' alt='logo' className='logo' />
        <h1 className='form-title'>ADD NEW ADMIN</h1>
        <form onSubmit={handleAddNewAdmin}>
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
          <div style={{ justifyContent: 'center', alignItems: "center" }}>
            <button type='submit'>ADD NEW ADMIN</button>
          </div>
        </form>
      </div>
    </section>
  )

}

export default AddNewAdmin
