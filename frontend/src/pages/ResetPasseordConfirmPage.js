import React, { useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import { toast } from 'react-toastify'; // Import toast from react-toastify

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  });

  const { new_password, re_new_password } = formData;
  const navigate = useNavigate();
  const { uid, token } = useParams();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await reset_password_confirm(uid, token, new_password, re_new_password);

    if (result.success) {
      toast.success('Password changed successfully!');
      setRequestSent(true);
    } else {
      toast.error('Error: ' + result.message);
    }
  };

  if (requestSent) {
    navigate('/');
  }

  return (
    <>
      <Header />
      <div className='container mt-5'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              placeholder='New Password'
              name='new_password'
              value={new_password}
              onChange={onChange}
              minLength='6'
              required
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              placeholder='Confirm New Password'
              name='re_new_password'
              value={re_new_password}
              onChange={onChange}
              minLength='6'
              required
            />
          </div>
          <button className='btn btn-primary' type='submit'>
            Reset Password
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
