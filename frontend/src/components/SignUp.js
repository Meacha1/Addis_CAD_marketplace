import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import '../styles/SignUp.css';
import axios from 'axios';
import eyeIcon from '../assets/images/icons8-eye-30.png';

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    re_password: '',
    user_type: 'user', // Default user type, you can change this as needed
  });

  const { first_name, last_name, email, phone_number, password, re_password, user_type } = formData;

  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [passwordStrength, setPasswordStrength] = useState(''); // State for password strength
  const [passwordColor, setPasswordColor] = useState(''); // State for password strength color

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password') {
      checkPasswordStrength(value); // Check password strength only for the password field
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password && passwordStrength !== 'Weak') {
      signup(first_name, last_name, email, phone_number, password, re_password, user_type);
      setAccountCreated(true);
    } else {
      alert('Passwords do not match or password is weak. Please try again.');
    }
  };

  const navigate = useNavigate();

  // Use useEffect for navigation
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (accountCreated) {
      navigate('/login');
    }
  }, [isAuthenticated, accountCreated, navigate]);

  // Function to check password strength
  const checkPasswordStrength = (value) => {
    // Define regex patterns for password strength
    const lowercasePattern = /[a-z]/;
    const uppercasePattern = /[A-Z]/;
    const digitPattern = /[0-9]/;
    const specialCharacterPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    // Calculate password strength based on the number of criteria met
    let strength = 0;

    if (lowercasePattern.test(value)) {
      strength++;
    }
    if (uppercasePattern.test(value)) {
      strength++;
    }
    if (digitPattern.test(value)) {
      strength++;
    }
    if (specialCharacterPattern.test(value)) {
      strength++;
    }

    // Set the password strength and color
    switch (strength) {
      case 0:
        setPasswordStrength('Empty');
        setPasswordColor('');
        break;
      case 1:
        setPasswordStrength('Weak');
        setPasswordColor('#ff6565');
        break;
      case 2:
        setPasswordStrength('Moderate');
        setPasswordColor('#f9c542');
        break;
      case 3:
        setPasswordStrength('Strong');
        setPasswordColor('#78e88d');
        break;
      case 4:
        setPasswordStrength('Very_Strong');
        setPasswordColor('#249e5d');
        break;
      default:
        setPasswordStrength('');
        setPasswordColor('');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Sign Up</h1>
      <p>Create your Account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="First Name*"
            name="first_name"
            value={first_name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Last Name*"
            name="last_name"
            value={last_name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email*"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="phone"
            placeholder="Your Phone Number*"
            name="phone_number"
            value={phone_number}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <div className="password-input">
            <input
              className="form-control"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password*"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              maxLength="20"
              required
              style={{ borderColor: passwordColor }}
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {passwordVisible ? (
                <img src={eyeIcon} alt="Hide Password" />
              ) : (
                <img src={eyeIcon} alt="Show Password" />
              )}
            </span>
          </div>
          {/* Show password strength */}
          <div className="strength-bar">
            <div className={`strength-indicator ${passwordStrength}`} />
          </div>
          <div className="password-strength" style={{ color: passwordColor }}>
            {passwordStrength}
          </div>
        </div>
        <div className="form-group">
          <div className="password-input">
            <input
              className="form-control"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Confirm Password*"
              name="re_password"
              value={re_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              maxLength="20"
              required
              style={{ borderColor: passwordColor }}
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {passwordVisible ? (
                <img src={eyeIcon} alt="Hide Password" />
              ) : (
                <img src={eyeIcon} alt="Show Password" />
              )}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label>User Type:</label>
          <select
            className="form-control"
            name="user_type"
            value={user_type}
            onChange={(e) => onChange(e)}
          >
            <option value="user">User</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
