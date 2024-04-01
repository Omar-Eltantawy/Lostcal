import React from 'react'
import Home from './Components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import FindLost from './Components/FindLost'
import AddTheLost from './Components/AddTheLost'
import Search from './Components/Search'
import User from './Components/user'
import Adds from './Components/Adds'
import Losts from './Components/Losts'

const App = () => {
  return (
      <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/find-the-lost' element={<FindLost/>}/>
          <Route path='/add-the-lost' element={<AddTheLost/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/adds' element={<Adds/>}/>
          <Route path='/losts' element={<Losts/>}/>
        </Routes>
      </div>
      
  )
}

export default App