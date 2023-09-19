import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Login from '../components/Login';
import background1 from '../assets/images/background.png'

export default function HomePage() {
    return (
      <div className="page-container" style={{ backgroundImage: `url(${background1})` }}>
        <Header />
        <Login />
        <Footer />
      </div>
    );
  }