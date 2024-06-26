import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from "../main"
import axios from 'axios'
import { toast } from 'react-toastify'
import { GiHamburgerMenu } from "react-icons/gi"
const Navbar = () => {
    const [show, setShow] = useState(false)
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const navigateTo = useNavigate()
    const handleLogout = async () => {
        await axios.get("https://hospital-management-7lof.onrender.com/api/v1/user/patient/logout",
            { withCredentials: true }).then((res) => {
                toast.success(res.data.message)
                setIsAuthenticated(false)
            }).catch((err) => {
                console.log(err)
                toast.error(err.message)
            })
    }
    const gotoLogin = () => {
        navigateTo("/login")
    }
    return (
        <>
            <nav className='container'>
                <div className='logo'>
                    <img src='/logo.png' alt='logo' className='logo-img' />
                </div>
                <div className={show ? "navLinks showmenu" : "navLinks"}>
                    <div className='links'>
                        <Link to={"/"}>HOME</Link>
                        <Link to={"/appointment"}>APPOINTMENT</Link>
                        <Link to={"/about"}>ABOUT US</Link>
                    </div>
                    {isAuthenticated ?
                        (<button className='logoutBtn btn' onClick={handleLogout}>Logout</button>) :
                        (<button className='logoutBtn btn' onClick={gotoLogin}>Login</button>)}

                </div>
              
            </nav>
            
        </>
    )
}

export default Navbar