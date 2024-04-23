import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../main"
import axios from 'axios'
import { toast } from 'react-toastify'
// import toast from 'react-hot-toast'

import { useNavigate } from 'react-router-dom'
const AppointmentForm = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [nic, setNic] = useState()
  const [dob, setdob] = useState()
  const [gender, setGender] = useState()
  const [appointmentDate, setAppointmentDate] = useState()
  const [department, setDepartment] = useState()
  const [doctorFirstName, setDoctorFirstName] = useState()
  const [doctorLastName, setDoctorLastName] = useState()
  const [address, setAddress] = useState()
  const [hasVisited, setHasVisited] = useState()

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

  const [doctor, setDoctor] = useState([])
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get("https://hospital-management-7lof.onrender.com/api/v1/user/getAllDoctor",
        { withCredentials: true })
      setDoctor(data.doctor)
      console.log(data)
    }
    fetchDoctors()
    
  }, [])

  const navigateTo=useNavigate()

  const handleAppointment = async (e) => {
    e.preventDefault()
    try {
      const hasVisitedBool = Boolean(hasVisited)
      const data = await axios.post("https://hospital-management-7lof.onrender.com/api/v1/appointment/postAppointment", {
        firstName, 
        lastName, 
        email, 
        phone, 
        nic, 
        dob, 
        gender,
        appointment_date: appointmentDate, 
        department,
        doctor_firstName: doctorFirstName,
        doctor_lastName: doctorLastName,
        address,
        hasVisited: hasVisitedBool
      },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        })
        toast.success(data.message)
        
        navigateTo("/")

    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className='container form-component appointment-form'>
      <h2>Appointment</h2>

      <form onSubmit={handleAppointment}>
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
            <option value="">select Gender</option>
            <option value="Male">MALE</option>
            <option value="Female">FEMALE</option>
          </select>
          <input type='date'
            placeholder='Appointment Date'
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)} />
        </div>
        <div>
          <select value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("")
              setDoctorLastName("")
            }} >
            {departmentsArray.map((depart, index) => {
              return (
                <option value={depart} key={index}>{depart}</option>
              )
            })}

          </select>
          <select value={`${doctorFirstName} ${doctorLastName}`} onChange={((e) => {
            const [firstName, lastName] = e.target.value.split(" ")
            setDoctorFirstName(firstName);
            setDoctorLastName(lastName);
          })}
            disabled={!department}>
            <option>Select Doctor</option>
            {
              doctor.filter(doctor => doctor.doctorDepartment === department).map((doctor, index) => {
                return (
                  <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>{doctor.firstName}{doctor.lastName}  </option>
                )
              })
            }
          </select>
        </div>
        <textarea rows="5" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
        <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
          <p style={{ marginBottom: 0 }}>Have you visted Before</p>
          <input type='checkbox' checked={hasVisited} onChange={(e) => setHasVisited(e.target.checked)} style={{ flex: "none", width: "25px" }} ></input>
        </div>
        <div style={{ justifyContent: 'center', alignItems: "center" }}>
          <button>Get Appointment</button>
        </div>
      </form>
    </div>
  )
}

export default AppointmentForm