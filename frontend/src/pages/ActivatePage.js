import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file

const Activate = ({ verify }) => {
    const navigate = useNavigate();
    const { uid, token } = useParams(); // Use useParams to access route parameters
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const handleVerification = async () => {
            try {
                if (uid && token) {
                    await verify(uid, token);
                    setVerified(true);
                    // Notify the user of successful activation
                    toast.success('Account activated successfully. You can now log in.');
                }
            } catch (error) {
                // Notify the user of activation failure
                toast.error('Account activation failed. Please try again.');
            }
        };

        handleVerification();
    }, [verify, uid, token]); // Include uid and token in the dependencies array

    if (verified) {
        navigate('/login');
    }

    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={() => {
                        navigate('/'); // Example: Navigate to home on button click
                    }}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);
