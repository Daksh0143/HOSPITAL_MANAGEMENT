import React, { useState, useContext } from 'react'
import { Context } from "../main"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { toast } from 'react-toastify'
import toast from 'react-hot-toast'


const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [nic, setNic] = useState("")
  const [dob, setdob] = useState("")
  const [gender, setGender] = useState("")
  const [password, setPassword] = useState("")
  const [doctorDepartment, setDoctorDepartment] = useState("")
  const [docAvatar, setDocAvatar] = useState("")
  const [docAvatarPreview, setDocAvatarPreview] = useState("")
  const navigateTo = useNavigate()

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleavatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result)
      setDocAvatar(file)
    }
  }


  const handleAddNewDoctor = async (e) => {
    const formData = new FormData();
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("nic", nic)
    formData.append("gender", gender)
    formData.append("password", password)
    formData.append("doctorDepartment", doctorDepartment)
    formData.append("docAvatar", docAvatar)
    formData.append("dob", dob)

    e.preventDefault()
    try {
      const responce = await axios.post("https://hospital-management-7lof.onrender.com/api/v1/user/doctor/addDoctor",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
      toast.success(responce.data.message)
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
      // console.log()
      toast.error(error.response.data.message)
    }
  }
  if (!isAuthenticated) {
    navigateTo("/login")
  }
  return (
    <section className='page'>
      <div className='container form-component add-doctor-form'>
        <img src='/logo.png' alt='logo' className='logo' />
        <h1 className='form-title'>REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleAddNewDoctor}>
          <div className='first-wrapper'>
            <div style={{display:"flex",flexDirection:"column"}}>
              <img src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"} alt='Doctor Avatar' />
              <div>
              <input type='file' onChange={handleavatar} />
              </div>
            </div>
            <div>
              <input type='text' placeholder='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type='text' placeholder='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type='number' placeholder='phone number' value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input type='number' placeholder='NIC' value={nic} onChange={(e) => setNic(e.target.value)} />
              <input type='date' placeholder='Date of Birth' value={dob} onChange={(e) => setdob(e.target.value)} />
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option>select Gender</option>
                <option value="Male">MALE</option>
                <option value="Female">FEMALE</option>
              </select>
              <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <select value={doctorDepartment} onChange={(e)=>setDoctorDepartment(e.target.value)}>
                <option value="">Select Department</option>
                {departmentsArray.map((element,index)=>{
                    return(
                      <option value={element} key={index}>
                        {element}
                      </option>
                    )
                })}
              </select>
              <button type='submit'>ADD NEW DOCTOR</button>
            </div>
          </div>
         
         

         
        </form>
      </div>
    </section>
  )

}

export default AddNewDoctor
