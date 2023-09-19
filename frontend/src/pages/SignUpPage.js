import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SignUp from '../components/SignUp';
import background1 from '../assets/images/background2.jpg'



export default function HomePage() {
    return (
      <div className="page-container" style={{ backgroundImage: `url(${background1})` }}>
        <Header />
        <SignUp />
        <Footer />
      </div>
    );
  }