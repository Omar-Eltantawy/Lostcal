import { Link } from "react-router-dom";

import logo from "../assets/images/landing-title.png";
import splat from "../assets/images/paint-splat.png";
import hero from "../assets/images/resetPasswordImage.png";
import iIcon from "../assets/images/lockIcon.png";
import lock from "../assets/images/padlock 1.png";
import confirm from "../assets/images/confirmation 1.png";

import styles from "./ForgotPassword.module.css";

const ChangePassword = () => {
  return (
    <div className={styles.main}>
      <div className={styles.rightSide}>
        <img src={logo} alt="logo" />
        <img src={splat} alt="splat" />
        <img src={hero} alt="hero" />
      </div>
      <div className={styles.leftSide}>
        <img src={iIcon} alt="icon" />
        <h1>Update Password</h1>
        <div className={styles.inputField}>
          <img src={lock} alt="lock" />
          <input type="email" placeholder="New Password" />
        </div>
        <div className={styles.inputField}>
          <img src={confirm} alt="" />
          <input type="email" placeholder="Confirm New Password" />
        </div>
        <button>Change Password</button>
      </div>
    </div>
  );
};

export default ChangePassword;
