import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
import { connect } from 'react-redux';

function NavigationBar({ isAuthenticated, user }) {
  const [isOpen, setIsOpen] = useState(false);

  const userId = user ? user.id : null;
  const user_type = user ? user.user_type : null;

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
