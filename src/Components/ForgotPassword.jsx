import { Link } from "react-router-dom";

import logo from "../assets/images/landing-title.png";
import splat from "../assets/images/paint-splat.png";
import hero from "../assets/images/forgotPasswordImage.png";
import iIcon from "../assets/images/iIcon.png";
import mail from "../assets/images/email 2.png";

import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  return (
    <div className={styles.main}>
      <div className={styles.rightSide}>
        <img src={logo} alt="" />
        <img src={splat} alt="" />
        <img src={hero} alt="" />
      </div>
      <div className={styles.leftSide}>
        <img src={iIcon} alt="" />
        <h1>Forgot Password</h1>
        <p>Enter your email and we will send you a link to reset <br /> your password</p>
        <div className={styles.inputField}>
          <img src={mail} alt="" />
          <input type="email" placeholder="Enter your email" />
        </div>
        <button>Submit</button>
        <div className={styles.linkSection}>
          <Link to="/login">
            <i className="fa-solid fa-angle-left"></i>
            <span>Back To Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
