import React, { useContext, useEffect, useState } from 'react'
import {Context} from "../main"
import axios from 'axios'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

const Doctor = () => {
  const [doctors,setDoctors] =useState([])
  const {isAuthenticated,setIsAuthenticated }=useContext(Context)


  useEffect(()=>{
    const fetchDoctor=async()=>{
      try {
        const {data}=await axios.get("https://hospital-management-7lof.onrender.com/api/v1/user/getAllDoctor",{
          withCredentials:true
        })
        // console.log(data.doctor)
        setDoctors(data.doctor)
        
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchDoctor() 
  },[])

  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }
  return (
    <>
      <section className='page doctors'>
        <h1>DOCTORS</h1>
        <div className='banner'>
          {doctors && doctors.length>0 ? (
            doctors.map((element)=>{
              return(
                <div className='card'>
                  <img src={element.docAvatar && element.docAvatar.url} alt='Doctor Avatar'/>
                  <h4>{`${element.firstName} ${element.lastName}`}</h4>
                  <div className='details'>
                    <p>Email: <span> {element.email}</span></p>
                    <p>Phone: <span>{element.phone}</span></p>
                    <p>NIC: <span>{element.nic}</span></p>
                    <p>DOB: <span>{element.dob.substring(0,10)}</span></p>
                    <p>Gender: <span>{element.gender}</span></p>
                    <p>Department: <span>{element.doctorDepartment}</span></p>
                  </div>
                </div>
              )
            })
          ) :(<h1>No Doctor Are Available</h1>)}
        </div>
      </section>
    </>
  )
}

export default Doctor