import "./Adds.css"
import React, { Fragment, useEffect, useState } from 'react'
import NewHeader from './NewHeader'
import LostCard from './LostCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAdds } from '../redux/addSlice'
import { CustomLoader } from "../CustomLoader"

const Adds = () => {
  const token=useSelector((state)=>state.user.token);
  const  addPatchLoading=useSelector((state)=>state.patch.loading);
  const dispatch=useDispatch();
  const addsData=useSelector((state)=>state.add.data);
  useEffect(()=>{
    dispatch(getAdds(token))
    addsData
    // console.log(addsData)
  },[token,dispatch,addsData]);
  return (
    <div className='adds'>
    {
      addPatchLoading?(
        <div className="loader-overlay">
          <CustomLoader/>
        </div>
      ):(
        <Fragment>
          <NewHeader active="user"/>
          <div className='heading'>
            <h1>The Lost People Who You Found them</h1>
          </div>
          {
            addsData && addsData.map((addData,i)=>(
              <LostCard key={i} add name={addData.name} address={addData.address} img={addData.img} phoneNumber={addData.phoneNumber} email={addData.email} id={addData.id} />
            ))
          }
        </Fragment>
      )
    }
      
    </div>
  )
}

export default Adds