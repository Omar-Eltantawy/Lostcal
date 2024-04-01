import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='header'>
        <div className='container'>
            <div className='logo'>
                <Link to="/"><img src='/src/assets/images/logo.png' alt='logo'/></Link>
                <p>Find The Lost , SAVE The Day </p>
            </div>
            <ul>
                <li><a href='#services'>services</a></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/find-the-lost" className='btn'>find the lost</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Header