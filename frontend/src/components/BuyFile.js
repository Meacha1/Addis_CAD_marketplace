import React from 'react';
import '../styles/FileBuy.css'
import { useNavigate } from 'react-router-dom';


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
