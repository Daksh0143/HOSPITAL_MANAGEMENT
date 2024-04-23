import React, { useContext, useEffect } from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../src/Pages/Home"
import Appointment from "../src/Pages/Appointment"
import Login from "../src/Pages/Login"
import Register from "../src/Pages/Register"
import AboutUs from "../src/Pages/AboutUs"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar'
import { Context } from './main'
import axios from 'axios'
import Footer from './Components/Footer'
// import toast, { Toaster } from "react-hot-toast";
const App = () => {
  const {isAuthenticated,setIsAuthenticated,user,setUser} =useContext(Context)
  useEffect(()=>{
    const fetchUser=async()=>{
      try {
        const responce=await axios.get("https://hospital-management-7lof.onrender.com/api/v1/user/patient/me",{withCredentials:true})
        setIsAuthenticated(true)
        setUser(responce.data.user)
      } catch (error) {
        setIsAuthenticated(false)
        setUser({});
      }
    }
    fetchUser()
  },[isAuthenticated])
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<AboutUs />} />
        </Routes>
        <Footer/>
        <ToastContainer position='top-center' />
      </Router>
    </>
  )
}

export default App
