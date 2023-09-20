import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
import { connect } from 'react-redux';
import { getUserInfoById } from '../utils/getUserInfo';

function NavigationBar({isAuthenticated, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user_type, setUserType] = useState('');

  const userId = props.user.id;


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfoById(userId);
        setUserType(userInfo?.user_type);
        console.log(user_type);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo(userId);
  }, [userId, user_type]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Conditionally render the navigation bar based on user_type
  if (user_type === 'professional' || user_type === 'admin') {
    return (
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        <div className="container">
          <button
            className={`navbar-toggler ${isOpen ? 'open' : ''}`}
            type="button"
            aria-label="Toggle navigation"
            onClick={toggleNavbar}
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} fa-2x`}></i>
          </button>
          <div className={`navbar-collapse ${isOpen ? 'open' : ''}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/uploadfile/${userId}`} className="nav-link">
                  Upload File
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/profile/${userId}`} className="user-profile">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    // If user_type is not "professional", return null to prevent rendering
    return null;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(NavigationBar);
