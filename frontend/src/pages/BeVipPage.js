import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BeVip from '../components/BeVip'


export default function FilePage() {

    return (
      <>
        <Header is_active={true}/>
        <BeVip />
        <Footer />
      </>
    );
  }