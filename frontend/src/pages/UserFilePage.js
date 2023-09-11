import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PublicFileDetail from '../components/PublicFileDetail'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserInfoById } from '../utils/getUserInfo';


export default function FilePage() {
  const location = useLocation();
  let {currentUserId}  = location.state;
  const [userInfo, setUserInfo] = useState(null);
  currentUserId = currentUserId.userId;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfoById(currentUserId);
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUserId) {
      fetchUserInfo();
    }
  }, [currentUserId]);

    return (
      <>
        <Header username={userInfo?.username} is_active={true}/>
        <PublicFileDetail />
        <Footer />
      </>
    );
  }