import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios'
import { GoCheckCircleFill } from "react-icons/go"
import { AiFillCloseCircle } from "react-icons/ai"
import toast from 'react-hot-toast'



const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context)
  const [appointment, setAppointments] = useState([])
  const [doctor,setDoctors]=useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get("https://hospital-management-7lof.onrender.com/api/v1/appointment/getAppointment"
          , { withCredentials: true })
        setAppointments(data.appointment)
      } catch (error) {
        setAppointments([])
        console.log(error, "error")
      }
    }
    fetchAppointments()
  }, [])

  useEffect(()=>{
    const fetchDoctor=async()=>{
      try {
        const {data}=await axios.get("https://hospital-management-7lof.onrender.com/api/v1/user/getAllDoctor",{
          withCredentials:true
        })
        console.log(data.doctor)
        setDoctors(data.doctor)
        
      } catch (error) {
        toast.error(error.responce.data.message)
      }
    }
    fetchDoctor() 
  },[])


  const navigate = useNavigate()

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(`https://hospital-management-7lof.onrender.com/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      )
      setAppointments(prevAppointments => 
        prevAppointments.map(appointment => 
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      )
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  if (!isAuthenticated) {
    navigate("/login")
  }

  return (
    <>
      <section className='dashboard page'>
        <div className='banner'>
          <div className='firstBox'>
            <img src='/doc.png' alt='doctorImage' />
            <div className='content'>
              <div>
                <p>Hello ,</p>
                <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
              </div>
              <p>A Hospital Management System is a software application that helps hospitals
                and healthcare facilities manage appointments, patient records, medical staff, and billing.
                The appointment module enables patients to schedule, reschedule, or cancel appointments online,
                reducing wait times and improving patient satisfaction.
              </p>
            </div>
          </div>
          <div className='secondBox'>
            <p>Total Appointments</p>
            <h3>{appointment.length}</h3>
          </div>
          <div className='thirdBox'>
            <p>Registered Doctor</p>
            <h3>{doctor.length}</h3>
          </div>
        </div>
        <div className='banner'>
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointment && appointment.length > 0 ? (
                appointment.map((appointment) => {
                  return (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appointment_date.substring(0, 16)}</td>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select className={appointment.status === "Pending"
                          ? "value-pending" :
                          appointment.status === "Rejected"
                            ? "value-rejected" :
                            "value-accepted"}
                          value={appointment.status}
                          onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}>
                          <option value="Pending" className='value-pending'>Pending</option>
                          <option value="Accepted" className='value-accepted'>Accepted</option>
                          <option value="Rejected" className='value-rejected'>Rejected</option>
                        </select>
                      </td>
                      <td>{appointment.hasVisited === true ?
                        <GoCheckCircleFill className='green' /> :
                        <AiFillCloseCircle className='red' />}
                      </td>
                    </tr>
                  )
                })
              ) : (<h1>No Appointments </h1>)}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Dashboard