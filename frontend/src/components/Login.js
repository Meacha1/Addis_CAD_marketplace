import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import eyeIcon from '../assets/images/icons8-eye-30.png';
import '../styles/Login.css';

const Login = ({ login, isAuthenticated, ...props }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/user`);
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

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
        <div className='password-input'>
          <input
            className="form-control"
            type={passwordVisible ? 'text' : 'password'}
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
            required
          />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {passwordVisible ? (
                <img src={eyeIcon} alt="Hide Password" />
              ) : (
                <img src={eyeIcon} alt="Show Password" />
              )}
            </span>
        </div>
        <button className='login' type='submit'>
          Login
        </button>
      </form>
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
