import React, { useState, useEffect } from 'react';
import '../styles/BuyFilePage.css';
import { useParams } from 'react-router-dom'; 
import telebirr from '../assets/images/telebirr.png';
import cbebirr from '../assets/images/cbebirr.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

function BuyFilePage() {
  const [file, setFile] = useState(null);
  const { fileId } = useParams(); // Get the file ID from the route parameters
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showTransactionForm1, setShowTransactionForm1] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`/api/FileDetail/${fileId}/`);
        const data = await response.json();
        setFile(data);
      } catch (error) {
        console.error(error);
        setFile(null);
      }
    };

    fetchFile();
  }, [fileId]);

    const togglePaymentOptions = () => {
      setShowPaymentOptions(!showPaymentOptions);
    };
  
    const toggleTransactionForm = (event) => {
        // Prevent toggling the form when clicking inside the input field
        if (!event.target.id.includes('transaction_number')) {
          setShowTransactionForm(!showTransactionForm);
        }
      };
    const toggleTransactionForm1 = (event) => {
    // Prevent toggling the form when clicking inside the input field
    if (!event.target.id.includes('transaction_number')) {
        setShowTransactionForm1(!showTransactionForm1);
    }
    };

  const handlePurchase = (event) => {
    event.preventDefault();
    // Handle the purchase logic here (e.g., send a request to the server).
    // You can use the 'fileId' to identify the file being purchased.
    console.log(`Purchased file with ID: ${fileId}`);
  };

  return (
    <>
      <Header is_active={true}/>
      <div className="main-container">
        <div className='detail'>
          <h1 className="buy-file-title">Buy File</h1>
          <div className="file-details">
            <img src={`${file?.file}`} alt={`${file?.title}`} className='file-img' />
            <h2>{file?.title}</h2>
            <p>{file?.description}</p>
            <p>Price: {file?.price}</p>
            <p>Category: {file?.category}</p>
          </div>
          <button onClick={togglePaymentOptions} className="buy-button">
            Buy File
          </button>
        </div>
        <div className='buy'>
          {showPaymentOptions && (
              <div className="payment-options">
                <h2>Select a Payment Option</h2>
                <h2 className="payment-info">
                  For mobile payment, use our number 0909068750 and transfer {file?.price} birr either through telebirr or cbebirr
                </h2>
                <p>Select the payment method you used and send us the <b>transaction number</b></p>
                <ul>
                  <div className="payment-method" onClick={toggleTransactionForm}>
                    <img
                      src={telebirr}
                      alt="telebirr logo"
                      onClick={toggleTransactionForm}
                    />
                    <li onClick={toggleTransactionForm}>
                      <form
                        id="transaction-form"
                        action="vip"
                        method="POST"
                        style={{ display: showTransactionForm ? 'block' : 'none' }}
                      >
                        <label htmlFor="transaction_number">
                          Transaction Number:
                        </label>
                        <div>
                          <input
                            type="text"
                            id="transaction_number"
                            name="transaction_number"
                            placeholder="AG322c6Wk1"
                            required
                          />
                          <button type="submit" onClick={handlePurchase}>
                            Submit
                          </button>
                        </div>
                      </form>
                    </li>
                  </div>
                  <div className="payment-method">
                    <img src={cbebirr} alt="cbebirr logo" onClick={toggleTransactionForm1}/>
                    <li onClick={toggleTransactionForm1}>
                      <form
                        id="transaction-form"
                        action="vip"
                        method="POST"
                        style={{ display: showTransactionForm1 ? 'block' : 'none' }}
                      >
                        <label htmlFor="transaction_number">
                          Transaction Number:
                        </label>
                        <div>
                          <input
                            type="text"
                            id="transaction_number"
                            name="transaction_number"
                            placeholder="AG322c6Wk1"
                            required
                          />
                          <button type="submit" onClick={handlePurchase}>
                            Submit
                          </button>
                        </div>
                      </form>
                    </li>
                  </div>
                </ul>
              </div>
            )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BuyFilePage;
