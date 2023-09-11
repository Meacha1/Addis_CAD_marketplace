import React from 'react';
import axios from 'axios';
import '../styles/FileBuy.css'
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



const BuyFile = ({ fileId }) => {
  const navigate = useNavigate();
  const handleBuy = async () => {
    navigate(`/buy/${fileId}`);
  };
  return (
    <button className='buy-button' onClick={handleBuy}>Buy</button>
  );
};

export default BuyFile;
