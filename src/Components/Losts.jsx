import "./Adds.css"
import React, { Fragment, useEffect } from 'react'
import NewHeader from './NewHeader'
import LostCard from './LostCard'
import { useDispatch, useSelector } from 'react-redux'
import { getLost } from '../redux/lostSlice'
import { CustomLoader } from "../CustomLoader"

const Losts = () => {
  const token=useSelector((state)=>state.user.token);
  const lostsData=useSelector((state)=>state.lost.data);
  const myLostPatchLoading=useSelector((state)=>state.patch.loading);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getLost(token));
    lostsData
  },[token,dispatch,lostsData]);
  return (
    <div className="losts">
    {
      myLostPatchLoading? (
        <div className="loader-overlay">
          <CustomLoader/>
        </div>
      ):(
        <Fragment>
          <NewHeader active="user"/>
          <div className='heading'>
            <h1>The Lost people Who You Search For Them </h1>
          </div>
          {
            lostsData && lostsData.map((lostData)=>(
              <LostCard key={lostData.id} lost name={lostData.name} age={lostData.age} address={lostData.address} images={lostData.img} phoneNumber={lostData.phoneNumber} email={lostData.email} id={lostData.id} />
            ))
          }
        </Fragment>
      )
    }
        
    </div>
  )
}

export default Losts