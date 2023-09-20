import React, { useState } from 'react';
import '../styles/BeVip.css';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import telebirr from '../assets/images/telebirr.png';
import cbebirr from '../assets/images/cbebirr.png';

function BeVip({ isAuthenticated, ...props }) {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showTransactionForm1, setShowTransactionForm1] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    transaction_number: '',
  });
  const [selectedPeriod, setSelectedPeriod] = useState('1');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userId = props.user.id;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Define the price based on the selected period
    let price = '5.00'; // Default price for 1 month

    if (selectedPeriod === '2') {
      price = '10.00'; // Price for 2 months
    } else if (selectedPeriod === '3') {
      price = '20.00'; // Price for 3 months
    }

    // Build the URL with the transaction_number and price parameters
    const transactionNumber = formData.transaction_number;
    const url = `${process.env.REACT_APP_API_URL}/api/check-transaction/vipSubscription/${transactionNumber}/${price}/${userId}/${userId}/`;

    // Send a GET request with the transaction_number and price included in the URL
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();
        const message = data.message;
        console.log(message);
        if (message === 'The transaction number has already been used.') {
          alert('The transaction number has already been used.');
        } else if (message === 'You have completed a successful purchase.') {
          alert('You have completed a successful purchase.');
          navigate(-1)
        } else if (message == "The transaction number does not exist in the database.") {
          alert('The transaction number does not exist in the database.')
        }

      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  return (
    <div className="container">
      <h1 className="upgrade-title">Upgrade to VIP Membership</h1>
      <div className="membership-options">
        <div className="free">
          <div className="free-header">
            <h2>Free Membership</h2>
          </div>
          <ul>
            <li>You can download only free files</li>
            <li>You can upload files to your account</li>
            <li>you can give reviews to a file</li>
          </ul>
        </div>
        <div className="vip">
          <div className="vip-header">
            <h2>VIP Membership</h2>
          </div>
          <ul>
            <li>Can download all files</li>
            <li>Can upload files to your account</li>
            <li>Can give reviews to a file</li>
          </ul>
        </div>
      </div>
      <div className="membership-options">
        <div className="vip">
          <div className="vip-header">
            <h2>VIP Membership</h2>
          </div>
          <ul>
          </ul>
          <h4>Select Membership Period:</h4>
          <div>
            <label>
              <input
                type="radio"
                name="period"
                value="1"
                checked={selectedPeriod === '1'}
                onChange={() => setSelectedPeriod('1')}
              />
              1 month (5 birr)
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="period"
                value="2"
                checked={selectedPeriod === '2'}
                onChange={() => setSelectedPeriod('2')}
              />
              2 months (10 birr)
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="period"
                value="3"
                checked={selectedPeriod === '3'}
                onChange={() => setSelectedPeriod('3')}
              />
              3 months (20 birr)
            </label>
          </div>
        </div>
      </div>
      <button onClick={togglePaymentOptions} className="upgrade-button">
        Upgrade to VIP
      </button>
      {showPaymentOptions && (
        <div className="payment-options">
          <h2>Select a Payment Option</h2>
          <h4 className="payment-info">
            For mobile payment, use our number 0909068750
          </h4>
          <ul>
            <div className="payment-method" onClick={toggleTransactionForm}>
              <img
                src={telebirr}
                alt="telebirr logo"
                onClick={toggleTransactionForm}
              />
              <li onClick={toggleTransactionForm}>
                <form
                  id="transaction-form-telebirr"
                  onSubmit={handleFormSubmit}
                  style={{
                    display: showTransactionForm ? 'block' : 'none',
                  }}
                >
                  <label htmlFor="transaction_number">
                    Transaction Number:
                  </label>
                  <div>
                    <input
                      type="text"
                      id="transaction_number-telebirr"
                      name="transaction_number"
                      placeholder="AG322c6Wk1"
                      required
                      onChange={handleInputChange}
                    />
                    <button type="submit" value="vip">
                      Submit
                    </button>
                  </div>
                </form>
              </li>
            </div>
            <div className="payment-method" onClick={toggleTransactionForm1}>
              <img src={cbebirr} alt="cbebirr logo" onClick={toggleTransactionForm1} />
              <li onClick={toggleTransactionForm1}>
                <form
                  id="transaction-form-cbebirr"
                  onSubmit={handleFormSubmit}
                  style={{
                    display: showTransactionForm1 ? 'block' : 'none',
                  }}
                >
                  <label htmlFor="transaction_number">
                    Transaction Number:
                  </label>
                  <div>
                    <input
                      type="text"
                      id="transaction_number-cbebirr"
                      name="transaction_number"
                      placeholder="AG322c6Wk1"
                      required
                      onChange={handleInputChange}
                    />
                    <button type="submit" value="vip">
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
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(BeVip);
