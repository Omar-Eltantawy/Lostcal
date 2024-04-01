import React, { useEffect, useState } from 'react'
import "./Search.css"
import NewHeader from './NewHeader'
import LostCard from './LostCard'
import { useDispatch, useSelector } from 'react-redux'
import { searchForLost } from '../redux/lostSlice'



const Search = () => {
    const [nameToSearch,setNameToSearch]=useState("");
    const token=useSelector((state)=>state.user.token);
    const lostPeople=useSelector((state)=>state.lost.data)
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(searchForLost({nameToSearch,token}));
    },[nameToSearch,token,dispatch])
    return (
        <React.Fragment>
            <div className='search'>
            <NewHeader active="search"/>
                <div className='container'>
                    <div className='left-img'>
                        <img src='/src/assets/images/paint-splat-paint-splashes-design-use-abstract-vector-illus-illustration(l).png' alt='left-img'/>
                    </div>
                    <div className='center-side'>
                        <div className='center-img'>
                            <img src='/src/assets/images/wifi.png' alt='center-img' />
                            <div className='search-input'>
                                <img src='/src/assets/images/loupe 1.png' alt='search'/>
                                <input type='text' placeholder='Search by the name of your lost person' name='search' value={nameToSearch} onChange={(e)=>setNameToSearch(e.target.value)} />
                            </div>
                            <p>Don't lose hope</p>
                        </div>
                    </div>
                    <div className='right-img'>
                        <div className='first-right-img'>
                            <img src='/src/assets/images/lovepik-splash-material-png-image(r).png' alt='right-img'/>
                        </div>
                        <div className='second-right-img'>
                            <img src='/src/assets/images/couple.png' alt='couple-img'/>
                        </div>
                    </div>
                </div>
            </div>
            {
                lostPeople.map((lostPerson,i)=>(
                    <LostCard key={i} search name={lostPerson.name} age={lostPerson.age} address={lostPerson.address} phoneNumber={lostPerson.phoneNumber} images={lostPerson.images}  />
                ))
            }
            
        </React.Fragment>
    )
}

export default Search