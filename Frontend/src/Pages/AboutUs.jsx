import React from 'react'
import Hero from "../Components/Hero"
import Biography from "../Components/Biography"

const AboutUs = () => {
  return (
    <>
      <Hero title={"Learn more about us | Zeecare Medical Institute"} imageUrl={"/about.png"}/>
      <Biography imageUrl={"/whoweare.png"}/>
    </>
  )
}

export default AboutUs