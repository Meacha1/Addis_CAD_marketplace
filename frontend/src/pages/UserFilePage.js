import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PublicFileDetail from '../components/PublicFileDetail'


export default function FilePage() {
    return (
      <>
        <Header is_active={true}/>
        <PublicFileDetail />
        <Footer />
      </>
    );
  }