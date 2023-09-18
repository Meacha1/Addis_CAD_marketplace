import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { loginUser } from '../utils/auth';
import axios from 'axios';
import '../styles/Login.css';

const Login = ({ login, isAuthenticated, user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
    handleLogin(e); // Pass the event object to the handleLogin function
  };

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`);
      window.location.replace(res.data.authorization_url);
    } catch (err) {
      console.error(err);
    }
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`);
      window.location.replace(res.data.authorization_url);
    } catch (err) {
      console.error(err);
    }
  };


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Attempt to log in the user
      const response = await loginUser(formData);

      console.log(response);

      if (response.message === 'Login successful!') {
        // Set the user information in the context
        const { id, email } = response.user; // Destructure user object
        try {
          if (id === null) {
            navigate(`/login`);
          }
          navigate(`/user/${id}`);
        } catch (error) {
          console.error('error in navigate: ', error);
        }
      } else {
        // Show an alert for incorrect credentials
        alert('Incorrect email or password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const userinfo = JSON.stringify(user);

  console.log(`user: ${userinfo}`)

  return (
    <div className='container_login'>
      <h1>Sign In</h1>
      <p>Sign into your Account</p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <button className='login' type='submit'>
          Login
        </button>
      </form>
      <button className='google' onClick={continueWithGoogle}>
        Continue With Google
      </button>
      <br />
      <button className='facebook' onClick={continueWithFacebook}>
        Continue With Facebook
      </button>
      <p className='mt-3'>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </p>
      <p className='mt-3'>
        Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(Login);
