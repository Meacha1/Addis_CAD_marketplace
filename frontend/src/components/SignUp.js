import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import '../styles/SignUp.css';
import axios from 'axios';

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

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, phone_number, password, re_password, user_type);
            setAccountCreated(true);
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
            <input
              className="form-control"
              type="password"
              placeholder="Password*"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password*"
              name="re_password"
              value={re_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);
