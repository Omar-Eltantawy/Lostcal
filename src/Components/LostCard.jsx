import React, { Fragment, useState } from 'react'
import "./LostCard.css"
import { useDispatch, useSelector } from 'react-redux'
import { deleteAdds } from '../redux/addSlice';
import { deleteLost } from '../redux/lostSlice';
const LostCard = ({lost,add,search,name,age,address,phoneNumber,images,email,img,id}) => {
  // const images=[
  //   "../../src/assets/images/child.png",
  //   "../../src/assets/images/child2.png",
  //   "../../src/assets/images/child3.png",
  // ];
  const token=useSelector((state)=>state.user.token);
  const addLoading=useSelector((state)=>state.add.loading);
  const lostLoading=useSelector((state)=>state.lost.loading);
  const dispatch=useDispatch();
  const deleteTheAdd=()=>{
    dispatch(deleteAdds({id,token}));
    id="";
  }
  const deleteTheLost=()=>{
    dispatch(deleteLost({id,token}));
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div  className='lost-card'>
        <div className='card-container'>
            <div className='slider'>
              {
                lost || search ?
                  (images? images.map((img,i)=>(
                    <div key={i} className ={i === currentIndex ? 'images slide active' : 'images slide'}>
                      <img src={img} alt={`child${i}`}/>
                    </div>
                  )):null)
                :(
                <div className='images'>
                  <img src={img} alt={`add/${img}`}/>
                </div>
                )
                
              }
              {
                lost || search ?(
                  <Fragment>
                    <button className="prev" onClick={prevSlide} >
                      &#10094;
                    </button>
                    <button className="next" onClick={nextSlide}>
                      &#10095;
                    </button>
                  </Fragment>
                ):null
              }
            </div>
            <div className='card-info'>
                <p>Name : <span style={{wordWrap:"break-word"}}>{name}</span></p>
                {age && <p>age : <span>{age}</span></p>}
                <p>address : <span>{address}</span></p>
                {email ? <p>contact mail : <span>{email}</span></p>:null}
                <p>contact number: <span>{phoneNumber}</span></p>
                {
                  (add) ?(
                    <div>
                      <span>
                        <i className="fa-solid fa-pen"></i>
                      </span>
                      <button onClick={deleteTheAdd}>found</button>
                    </div>
                  ):(lost)?(
                    <div>
                      <span>
                        <i className="fa-solid fa-pen"></i>
                      </span>
                      <button onClick={deleteTheLost}>found</button>
                    </div>
                  ):
                  (
                    <div>
                      <button style={{backgroundColor:"#D9D9D9",color:"#000"}}>found</button>
                    </div>
                  )
                }
            </div>
            
        </div>
    </div>
  )
}

export default LostCard