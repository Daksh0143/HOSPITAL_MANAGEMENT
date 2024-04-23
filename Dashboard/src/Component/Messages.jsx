import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const { isAuthenticated } = useContext(Context)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get("https://hospital-management-7lof.onrender.com/api/v1/message/getAllMessages",
          { withCredentials: true })
          
        setMessages(data.data)
      } catch (error) {
        console.log("Error", error)
      }
    }
    fetchMessages()
  })

  console.log(messages)

  if (!isAuthenticated) {
    navigate("/login")
  }
  return (
    <section className='page messages'>
      <h1 className='page messages'>
        <div className='banner'>
          {messages && messages.length>0 ?(messages.map((element)=>{
            return(
              <div className='card'>
                <div className='details'>
                  <p>First Name: <span>{element.firstName}</span></p>
                  <p>Last Name: <span>{element.lastName}</span></p>
                  <p>Email : <span>{element.email}</span></p>
                  <p>Phone : <span>{element.phone}</span></p>
                  <p>Messages: <span>{element.message}</span></p>
                </div>
              </div>
            )
          })) :(<h1>No Messages Avaiable</h1>)}
        </div>
      </h1>
    </section>
  )
}

export default Messages