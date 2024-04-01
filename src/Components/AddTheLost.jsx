import React, { useState } from 'react'
import "./AddTheLost.css"
import addImg from "../assets/images/image-gallery 1.png"
import nameImg from "../assets/images/profile 3.png"
import addressImg from "../assets/images/location 1.png"
import title from "../assets/images/landing-title.png"
import dots from "../assets/images/paint-splat-paint-splashes-design-use-abstract-vector-illus-illustration(l).png"
import galaxy from "../assets/images/undraw_Location_search_re_ttoj (1) 1.png"
import emailImg from "../assets/images/email 2.png"
import phone from "../assets/images/phone-call 2.png"
import { showErrorAlert, showSuccessAlert } from '../alerts'
import { useDispatch, useSelector } from 'react-redux'
import { addTheLost } from '../redux/addSlice'
import { CustomLoader } from '../CustomLoader'
function AddTheLost(){
    const token=useSelector((state)=>state.user.token);
    const loading=useSelector((state)=>state.add.loading);
    const [img,setImg]=useState('');
    const [name,setName]=useState('');
    const [address,setAddress]=useState('');
    const [email,setEmail]=useState('');
    const [phoneNumber,setPhoneNumber]=useState('');
    const dispatch=useDispatch();

    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        setImg(file);
    }
    const handleSubmit=()=>{
        if (!token) {
            showErrorAlert("You can't add lost person without login ");
            return
        };
        if( !name|| !address || !email || !phoneNumber || !img){
            showErrorAlert("Please fill out all the fields and upload one image");
            return
        }
        const formData=new FormData();
        formData.append('img',img);
        formData.append('name',name);
        formData.append('address',address);
        formData.append('email',email);
        formData.append('phoneNumber',phoneNumber);
        dispatch(addTheLost({formData,token}));
        setImg("");
        setName("");
        setAddress("");
        setEmail("");
        setPhoneNumber("");
        console.log("form data",Object.fromEntries(formData))
        console.log(formData)
        console.log(token)
    }

  return (
    <div>
    {
        loading?(
            <div className="loader-overlay">
                <CustomLoader/>
            </div>
        ):(
            <div className='add-lost'>
            <div className="background-rectangle1"></div>
            <div className="background-rectangle2"></div>
            <div className="background-line1"></div>
            <div className="background-line2"></div>
            <div className="background-line3"></div>
            <div className='container'>
                <div className='left'>
                    <h1>Add the lost you found</h1>
                    <div className='add-img'>
                    {
                        img ? (
                            <label htmlFor="upload-image" style={{ cursor: 'pointer' }}>
                                <img
                                src={URL.createObjectURL(img)}
                                alt="Uploaded"
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
                            </label>
                        ):(
                            <label htmlFor="upload-image" style={{ cursor: 'pointer' }}>
                                <img src={addImg} alt='add-img'/>
                            </label>
                        )
                    }
                    <input id="upload-image" type="file" name='img' accept="image/*" style={{ display: 'none' }} onChange={handleImageChange}/>
                    </div>
                    <div className='left-input-container'>
                        <span>Name</span>
                        <div className="input-container">
                            <img src={nameImg} alt="name" />
                            <input type="text" placeholder="Enter name lost person if you know " name='name' value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <span>Missing Address</span>
                        <div className='input-container'>
                            <img className="input-logo" src={addressImg} alt="address" />
                            <textarea name="address" id="" cols="30" rows="10" placeholder="Enter Address that you found  the lost person "  value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='images'>
                        <img src='/src/assets/images/images.PNG' alt='images' />
                    </div>
                    <div className='right-input-container'>
                        <span>Contact mail</span>
                        <div className='input-container'>
                            <img className="input-logo" src={emailImg} alt="email" />
                            <input type="email" placeholder="Enter contact mail" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <span>Contact number</span>
                        <div className='input-container'>
                            <img className="input-logo" src={phone} alt="phone" />
                            <input type="text" placeholder="Enter contact number " name='phoneNumber' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} pattern="^01[0125][0-9]{8}" />
                        </div>
                    </div>
                    <div className='conf-btn' onClick={handleSubmit}>
                            <span>Confirm </span>
                            <span>information</span>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    </div>
  )
}

export default AddTheLost