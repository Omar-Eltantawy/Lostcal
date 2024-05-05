import { Link, useNavigate } from "react-router-dom";

import iIcon from "../assets/images/lockIcon.png";
import lock from "../assets/images/padlock 1.png";
import confirm from "../assets/images/confirmation 1.png";
import styles from "./ForgotPassword.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../redux/authSlice";
import { CustomLoader } from "../CustomLoader";
import { showErrorAlert, showSuccessAlert } from "../alerts";

const ChangePassword = () => {
  const [passwordCurrent,setPasswordCurrent]=useState("")
  const [password,setPassword]=useState("")
  const [passwordConfirm,setPasswordConfirm]=useState("")
  const token=useSelector((state)=>state.user.token);
  const loading=useSelector((state)=>state.user.loading);
  const success=useSelector((state)=>state.user.success);
  const error=useSelector((state)=>state.user.error);
  const dispatch=useDispatch()
  const navigate =useNavigate()
  useEffect(()=>{
    if(success){
      navigate("/")
    }
  },[success])
  const handleSubmit=()=>{
    console.log(token)
    dispatch(updatePassword({passwordCurrent,password,passwordConfirm,token}));
    setPasswordCurrent("");
    setPassword("");
    setPasswordConfirm("");
    console.log(error)
    console.log(success)
  }
  return (
    <div>
    {
      loading ? 
      <div className={styles.loaderOverlay}>
        <CustomLoader/>
      </div>:
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <img src={iIcon} alt="icon" />
          <h1>Update Password</h1>
          <div className={styles.inputField}>
            <img src={lock} alt="lock" />
            <input type="password" placeholder="Old Password" value={passwordCurrent} onChange={(e)=>setPasswordCurrent(e.target.value)}  />
          </div>
          <div className={styles.inputField}>
            <img src={lock} alt="lock2" />
            <input type="password" placeholder="New Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className={styles.inputField}>
            <img src={confirm} alt="conf" />
            <input type="password" placeholder="Confirm New Password" value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)} />
          </div>
          <button onClick={handleSubmit}>Change Password</button>
        </div>
      </div>
    }
    </div>
  );
};

export default ChangePassword;
