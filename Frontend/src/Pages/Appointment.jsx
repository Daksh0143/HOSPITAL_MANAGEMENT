import React from 'react'
import AppointmentForm from '../Components/AppointmentForm'
import Hero from '../Components/Hero'
const Appointment = () => {
  return (
    <>
        <Hero title={"Schedule your Appointment | ZeeCare Medical Institute"} imageUrl={"/signin.png"}/>
        <AppointmentForm/>
    </>
  )
}

export default Appointment