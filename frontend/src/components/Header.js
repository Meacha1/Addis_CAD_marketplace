import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import logo from '../assets/images/logo.png';
import { connect } from 'react-redux';

function Header({ is_active , ...props }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logingout = async(e) => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/');
  }

  const login = () => {
    navigate('/login');
  }

  const signup = () => {
    navigate('/signup');
  }

  return (
    <div className='header-container'>
      <header className="header">
        <div className="logo">
          <Link to='/'><img src={logo} alt="CAD Marketplace Logo" /></Link>
          <h2>Addis CAD Marketplace</h2>
        </div>
        <div className="auth-buttons">
          {is_active ? (
            <>
              <button className="logout-button" onClick={logingout}>LOG OUT</button>
            </>
          ) : (
            <>
              <button className="login-button" onClick={login}>LOG IN</button>
              <button className="register-button" onClick={signup}>SIGN UP</button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);