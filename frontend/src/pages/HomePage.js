import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutUs from '../components/AboutUs';
import ContactUs from '../components/ContactUs';
import '../styles/HomePage.css';
import heroImg from '../assets/images/construction-1.jpg';
import heroImg1 from '../assets/images/hero.jpg';


export default function HomePage() {
  return (
    <>
      <Header />
      <div className="home-container">
        <main className="main-content">
          <div className='hero-image'>
              <img className='hero' src={heroImg1} alt='heroImg1' />
          </div>
          <section className="description">
            <h4>
              Choose our marketplace because we're the architects of convenience. We bring your CAD needs to life with a seamless platform, connecting you to top-notch designers and engineers. Simplify your projects, accelerate your progress, and experience precision like never before.
            </h4>
          </section>
          <div className='hero-image'>
              <img className='hero' src={heroImg} alt="CAD Marketplace" />
          </div>
          <section className="user-groups">
            <div className="user-group">
              <h2>For Professionals</h2>
              <p>Access a wide range of CAD models created by industry experts to enhance your architectural and engineering projects while also opening up opportunities for additional income with the resources on hand.</p>
            </div>
            <div className="user-group">
              <h2>For Builders</h2>
              <p>Discover detailed CAD plans and blueprints that not only streamline your construction projects for maximum efficiency but also offer a price advantage like no other.</p>
            </div>
            <div className="user-group">
              <h2>For Students</h2>
              <p>Learn and practice CAD design principles with our educational resources and project examples.</p>
            </div>
          </section>
        </main>
      </div>
      <AboutUs />
      <ContactUs />
      <Footer />
    </>
  );
}
