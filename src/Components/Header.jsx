import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"
const Header = () => {
  const token=useSelector((state)=>state.user.token);
  return (
    <div className='header'>
        <div className='container'>
          <ul>
              <li className='active'><Link to="/">Home</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/find-the-lost">Find the lost</Link></li>
              <li><Link to="/add-the-lost">Add the lost</Link></li>
              {
                token ?
                  <li><Link to="/user">User</Link></li>: 
                    <li><Link to="/signup">Sign up</Link></li>
              }
              
          </ul>
        </div>
    </div>
  )
}

export default Header