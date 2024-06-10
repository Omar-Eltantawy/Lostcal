import React, { useEffect } from 'react'
import NewHeader from '../../Components/NewHeader/NewHeader'
import { useDispatch, useSelector } from 'react-redux'
import { allMatches } from '../../redux/matchesSlice';
import MatchesCard from '../../Components/Cards/MatchesCard';

const Matches = () => {
  const token = useSelector((state)=>state.user.token);
  const matchesData=useSelector((state)=>state.matches.data);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(allMatches(token));
    console.log(matchesData)
    console.log(token)
  },[dispatch,matchesData,token])
  return (
    <div className='matches'>
        <NewHeader active="user"/>
        {
          matchesData && matchesData.map((match,i)=>(
            <MatchesCard key={i} name={match.name} age={match.age ? match.age : null} address={match.address} images={match.img} phoneNumber={match.phoneNumber} email={match.email}/>
          ))
        }
    </div>
  )
}

export default Matches