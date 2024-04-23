import React, { useContext ,useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from "react-hot-toast";
import Dashboard from "./Component"
import AddNewDoctor from "./Component/AddNewDoctor"
import AddNewAdmin from "./Component/AddNewAdmin"
import Doctor from './Component/Doctor'
import Messages from './Component/Messages'
import SideBar from './Component/SideBar'
import Login from "./Component/Login"
import { Context } from "./main";
import "./App.css";
import axios from 'axios';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responce = await axios.get("https://hospital-management-7lof.onrender.com/api/v1/user/admin/me", { withCredentials: true })
        setIsAuthenticated(true)
        setUser(responce.data.user)
      } catch (error) {
        setIsAuthenticated(false)
        setUser({});
      }
    }
    fetchUser()
  }, [isAuthenticated])


  return (
    <Router>
      <SideBar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/doctor/addNew' element={<AddNewDoctor />} />
        <Route path='/admin/addNew' element={<AddNewAdmin />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/doctor' element={<Doctor />} />
      </Routes>
      <Toaster position='top-center' />
    </Router>

  )
}

export default App