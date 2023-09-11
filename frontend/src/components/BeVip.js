import React, { useState } from 'react';
import '../styles/BeVip.css';
import telebirr from '../assets/images/telebirr.png';
import cbebirr from '../assets/images/cbebirr.png';

function BeVip() {
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [showTransactionForm1, setShowTransactionForm1] = useState(false);

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
              <li>5 projects and estimates</li>
              <li>No project updates</li>
              <li>No early access to new features and updates</li>
              <li>No bill of quantity report</li>
            </ul>
          </div>
          <div className="vip">
            <div className="vip-header">
                <h2>VIP Membership</h2>
            </div>
            <ul>
              <li>Unlimited projects and estimates</li>
              <li>Unlimited project updates</li>
              <li>Early access to new features and updates</li>
              <li>Bill of quantity report for major materials</li>
            </ul>
            <h4>5 birr/week or 50 birr/3 months or 150 birr/year</h4>
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
                      <button type="submit" value="vip">
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
  
  export default BeVip;
