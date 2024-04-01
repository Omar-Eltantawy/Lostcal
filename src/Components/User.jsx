import { useDispatch, useSelector } from "react-redux";
import NewHeader from "./NewHeader";
import styles from "./User.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUserInfo } from "../redux/authSlice";

const User = () => {
  const token=useSelector((state)=>state.user.token);
  const userData=useSelector((state)=>state.user.data);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getUserInfo(token));
  },[userData,token,dispatch])
  return (
    <div className={styles.user}>
      <NewHeader active="user" />
      <section className={styles.userPage}>
        <div>
          <div className={styles.userCard}>
            <div className={styles.userData}>
              <span>{userData.username && userData.username[0]}</span>
              <h3>{userData.username}</h3>
            </div>
            <div className={styles.userInputs}>
              <div className={styles.userInput}>
                <div>
                  <label>Name: </label>
                  <input value={userData.username} type="text" readOnly />
                </div>
                <span>
                  <i className="fa-solid fa-pen"></i>
                </span>
              </div>
              <div className={styles.userInput}>
                <div>
                  <label>Email: </label>
                  <input value={userData.email} type="text" readOnly />
                </div>
                <span>
                  <i className="fa-solid fa-pen"></i>
                </span>
              </div>
              {/*<div className={styles.userInput}>
                <div>
                  <label>Password: </label>
                  <input value={"sdlasmkdlasmd"} type="password" readOnly />
                </div>
                <span>
                  <i className="fa-solid fa-pen"></i>
                </span>
              </div>*/}
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <Link to="/losts">The Losts</Link>
          <Link to="/adds">The Adds</Link>
        </div>
      </section>
    </div>
  );
};

export default User;
