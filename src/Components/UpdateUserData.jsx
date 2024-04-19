import React, { useState } from 'react'
import "./UpdateUserData.css"
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from '../redux/patchSlice';
const UpdateUserData = ({type,name,email,id}) => {
  const token=useSelector((state)=>state.user.token);
  const [updatedUsername,setUpdatedUsername]=useState(name);
  const [updatedEmail,setUpdatedEmail]=useState(email);
  const dispatch=useDispatch()
  const handleInputChange=(e)=>{
    type === "username"?
      setUpdatedUsername(e.target.value):
      setUpdatedEmail(e.target.value);
  }
  const handleUpdateUsername=()=>{
    if( ! updatedUsername ){
      showErrorAlert("Please write a username");
      return
    }
    dispatch(updateUsername(updateUsername,id,token))
  }
  const handleUpdatedEmail=()=>{
    if( ! updatedUsername ){
      showErrorAlert("Please write an email");
      return
    }
  }

  return (
    <div className='update-user-data'>
        <label>{type}</label><br/>
        <div className='label-container'>
            <input 
              type='text'
              value={type === "username" ? updatedUsername : updatedEmail} 
              placeholder={`Update Your ${type}`} 
              onChange={(e)=>handleInputChange(e)} />
        </div>
        <button className='update' onClick={type === "username" ? handleUpdateUsername : handleUpdatedEmail }>Update</button>
    </div>
  )
}

export default UpdateUserData