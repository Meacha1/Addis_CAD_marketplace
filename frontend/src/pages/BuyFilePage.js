import React, { useState, useEffect } from 'react';
import '../styles/BuyFilePage.css';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import telebirr from '../assets/images/telebirr.png';
import cbebirr from '../assets/images/cbebirr.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

function BuyFilePage({ isAuthenticated, ...props }) {
  const [file, setFile] = useState(null);
  const { fileId } = useParams(); // Get the file ID from the route parameters
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showTransactionForm1, setShowTransactionForm1] = useState(false);
  const [isAuthenticatedToDownload, setIsAuthenticatedToDownload] = useState(false);
  
  const [formData, setFormData] = useState({
    transaction_number: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userId = props.user.id;
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Build the URL with the transaction_number parameter
    const transactionNumber = formData.transaction_number;
    const url = `${process.env.REACT_APP_API_URL}/api/check-transaction/buy/${transactionNumber}/${file.price}/${userId}/${file.id}/`;
    // Send a GET request with the transaction_number included in the URL
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();
        const message = data.message
        console.log(message)
        if (message === 'The transaction number has already been used.' || message === 'The transaction number does not exist in the database.') {
          alert("The transaction number has already been used or the transaction number does not exist in the database.")
        }
        else if (message === 'You have completed a successful purchase.') {
          alert("You have completed a successful purchase.")
          setIsAuthenticatedToDownload(true)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };



  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/FileDetail/${fileId}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        });
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

    const handleDownload = async () => {
      if (file) {
        try {
          const response = await fetch(file.file);
          const fileData = await response.blob();
    
          // Extract the file extension from the original filename
          const originalFileName = file.file;
          const fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));
    
          // Create a blob URL for the file data
          const url = URL.createObjectURL(fileData);
    
          // Create a temporary anchor element to trigger the download
          const a = document.createElement('a');
          a.href = url;
    
          // Set the desired filename with the original extension
          a.download = `${file.title}${fileExtension}`;
    
          a.style.display = 'none';
    
          // Append the anchor element to the document and click it
          document.body.appendChild(a);
          a.click();
    
          // Clean up
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error downloading the file:', error);
        }
      }
    };

  return (
    <>
      <Header is_active={true}/>
      <div className="main-container">
        <div className='detail'>
          <div className="file-details">
            <img src={`${file?.thumbnail}`} alt={`${file?.title}`} className='file-img' />
            <h2>{file?.title}</h2>
            <p>{file?.description}</p>
            <p>Price: {file?.price}</p>
            <p>Category: {file?.category}</p>
          </div>
          <button onClick={togglePaymentOptions} className="buy-button">
            Buy File
          </button>
          {isAuthenticatedToDownload && 
          <button className='download-button' onClick={handleDownload}>Download File</button>
          }
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
                        onSubmit={handleFormSubmit}
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
                            onChange={handleInputChange}
                          />
                          <button type="submit">
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
                            onChange={handleInputChange}
                          />
                          <button type="submit">
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
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(BuyFilePage);
