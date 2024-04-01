import "./Contact.css"
function Contact() {
  return (
    <div className="contact">
      <div className="contact-left">
        <h3>Contact Us</h3>
        <p>We are ready to answer any inquiries ?</p>
        <div>
          <img src="/src/assets/images/phone-call 1.png" alt="" />
          <span>+20 1234572284</span>
        </div>
        <p>you can fill out your details to be contacted</p>
        <div className="social-imgs">
          <img src="/src/assets/images/facebook-app-symbol 1.png" alt="" />
          <img src="/src/assets/images/instagram 1.png" alt="" />
        </div>
      </div>
      <div className="contact-right">
        <div className="form-row">
          <div className="half_row">
            <p>First Name</p>
            <input type="text" placeholder="First Name" />
          </div>
          <div className="half_row">
            <p>Last Name</p>
            <input type="text" placeholder="Last Name" />
          </div>
        </div>
        <div className="form-row">
          <div className="half_row">
            <p>Email</p>
            <input type="text" placeholder="Email" />
          </div>
          <div className="half_row">
            <p>Phone</p>
            <input type="text" placeholder="Phone" />
          </div>
        </div>
        <div className="last-row">
          <p>Message</p>
          <textarea placeholder="Please Enter Your Message..."></textarea>
        </div>
        <button>Send</button>
      </div>
    </div>
  );
}

export default Contact;
