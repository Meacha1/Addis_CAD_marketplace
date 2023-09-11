import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UploadFile from '../components/UploadFile';
import { useLocation } from 'react-router-dom';


export default function UploadFilePage() {
  const location = useLocation();
  const is_active = location.state?.is_active;
  console.log(is_active);
    return (
      <>
        <Header is_active={is_active} />
        <main>
          <h4>A page to upload your files to the marketplace</h4>
        </main>
        <UploadFile/>
        <Footer />
      </>
    );
  }