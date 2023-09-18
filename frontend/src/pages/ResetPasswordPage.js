import React, { useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast

import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        try {
            await reset_password(email);
            setRequestSent(true);
            // Show a success notification
            toast.success('Password reset email sent. Please check your email.');
        } catch (error) {
            // Handle errors and show an error notification
            toast.error('Failed to reset password. Please try again.');
        }
    };

    if (requestSent) {
        navigate('/');
    }

    return (
        <>
            <Header />
            <div className='container mt-5'>
                <h1>Request Password Reset:</h1>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <button className='btn btn-primary' type='submit'>Reset Password</button>
                </form>
                {/* Add the ToastContainer component at the bottom of your component */}
                <ToastContainer />
            </div>
            <Footer />
        </>
    );
};

export default connect(null, { reset_password })(ResetPassword);
