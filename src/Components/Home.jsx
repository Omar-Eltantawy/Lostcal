import React, { useEffect } from 'react'
import "./Home.css"
import Header from './Header'
import Landing from './Landing'
import Services from './Services'
import WhatWeDo from './WhatWeDo'
import About from './About'
import Contact from './Contact'
import NewHeader from "./NewHeader"
import { useSelector } from 'react-redux'


const Home = () => {
  return (
    <div className='home'>
        <Header/>
        <Landing/>
        <Services/>
        <WhatWeDo/>
        <About/>
        <Contact/>
    </div>
  )
}

export default Home