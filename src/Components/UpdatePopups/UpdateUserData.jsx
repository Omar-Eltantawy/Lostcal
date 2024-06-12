import React, { useState } from 'react'
import "./UpdateUserData.css"
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from '../../redux/patchSlice';
import { showErrorAlert } from '../alert&loader/alerts';
const UpdateUserData = ({type,name,email,id}) => {
  const token=useSelector((state)=>state.user.token);
  const [username,setUsername]=useState(name);
  // const [updatedEmail,setUpdatedEmail]=useState(email);
  const dispatch=useDispatch()
  const handleInputChange=(e)=>{
      setUsername(e.target.value)
  }
  const handleUpdateUsername=()=>{
    if( ! username ){
      showErrorAlert("Please write a username");
      return
    }
    dispatch(updateUsername({username,token}))
    console.log(token)
  }
  return (
    <div className='update-user-data'>
        <label>{type}</label><br/>
        <div className='label-container'>
            <input 
              type='text'
              value={ username} 
              placeholder={`Update Your username`} 
              onChange={(e)=>handleInputChange(e)} />
        </div>
        <button className='update' onClick={handleUpdateUsername}>Update</button>
    </div>
  )
}

export default UpdateUserData