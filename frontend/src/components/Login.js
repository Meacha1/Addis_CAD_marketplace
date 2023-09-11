import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { login } from '../actions/auth';
import axios from 'axios';
import '../styles/Login.css'

const Login = ({ login, isAuthenticated, user }) => {
    const [userid, setUserid] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });

    const { email, password } = formData;
    

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        login(email, password);
    
        getUserInfo();
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    const getUserInfo = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            });

            setUserid(res?.data.id);
        } catch (err) {
            console.log(err);
        }
    };

    if (isAuthenticated && userid !== null) {
        navigate(`/user/${userid}`);
    }

    return (
        <div className='container_login'>
            <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='login' type='submit'>Login</button>
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { login })(Login);