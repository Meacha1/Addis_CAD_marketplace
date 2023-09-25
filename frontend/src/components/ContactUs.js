import React from 'react';
import '../styles/ContactUs.css';
import elphazImage from '../assets/images/elphaz.jpg';
import myImage from '../assets/images/My_pic.jpg';
import linkedinIcon from '../assets/images/linkedin.png';
import githubIcon from '../assets/images/github.png';

const ContactUs = () => {
  return (
    <div id='contact' className="contact">
      <h1>CONTACT US</h1>
      <div className="contactlist">
        <div className="contact-card">
          <img src={elphazImage} alt="Person" className="profile-picture" />
          <div className="contact-info">
            <h3>Elphaz Shiferaw</h3>
            <p>Email: elphazshiferaw@gmail.com</p>
            <p>Phone: +251910151464</p>
            <a href="https://www.linkedin.com/in/elphazshiferaw/"><img src={linkedinIcon} alt="linkedin" /></a>
            <a href="https://github.com/Elphaz"><img src={githubIcon} alt="github" /></a>
          </div>
        </div>
        <div className="contact-card">
          <img src={myImage} alt="Person" className="profile-picture" />
          <div className="contact-info">
            <h3>Meacha Teshome</h3>
            <p>Email: meachattd@gmail.com</p>
            <p>Phone: +251909068750</p>
            <a href="https://www.linkedin.com/in/meacha-teshome/"><img src={linkedinIcon} alt="linkedin" /></a>
            <a href="https://github.com/Meacha1"><img src={githubIcon} alt="github" /></a>
          </div>
        </div>
        {/* ... Other contact cards ... */}
      </div>
    </div>
  );
}

export default ContactUs;
