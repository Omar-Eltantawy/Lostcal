import React from 'react'
import Home from './Components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import FindLost from './Components/FindLost'
import AddTheLost from './Components/AddTheLost'
import Search from './Components/Search'
import User from './Components/User'
import Adds from './Components/Adds'
import Losts from './Components/Losts'
import ForgotPassword from './Components/ForgotPassword'
import ChangePassword from './Components/ChangePassword'
import SecretCode from './Components/SecretCode'
import ResetPassword from './Components/ResetPassword'
import Matches from './Components/Matches'
import RequireAuth from './Components/RequireAuth'

const App = () => {
  return (
      <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/find-the-lost' 
          element={
          <RequireAuth>
            <FindLost/>
          </RequireAuth>}/>
          <Route path='/add-the-lost' 
          element={
          <RequireAuth>
            <AddTheLost/>
          </RequireAuth>}/>
          <Route path='/search' 
          element={
          <RequireAuth>
            <Search/>
          </RequireAuth>}/>
          <Route path='/user' element={<RequireAuth><User/></RequireAuth> }/>
          <Route path='/adds' element={<RequireAuth><Adds/></RequireAuth>}/>
          <Route path='/losts' element={<RequireAuth><Losts/></RequireAuth>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/change-password' element={<RequireAuth><ChangePassword/></RequireAuth>}/>
          <Route path='/secret-code' element={<SecretCode/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/matches' element={<RequireAuth><Matches/></RequireAuth>}/>
        </Routes>
      </div>
  )
}

export default App