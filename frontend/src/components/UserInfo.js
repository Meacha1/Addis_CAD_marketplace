import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../assets/images/user.png';

const UserInfo = ({ user, owner }) => {
  const [avatarURL, setAvatarURL] = useState(defaultAvatar);

  useEffect(() => {
    if (user && user.avatar) {
      setAvatarURL(user.avatar);
    }
  }, [user]);

  const handleAvatarChange = async (e) => {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/uploadAvatar/${owner}/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAvatarURL(data.avatar);
      } else {
        console.error('Failed to upload avatar');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div className="avatar-container">
        <img src={avatarURL} alt="avatar" className="avatar" />
        <div className="file-input-container">
          <input type="file" onChange={handleAvatarChange} />
          <label htmlFor="avatar-upload" className="btn_upload">
            Change Avatar
          </label>
        </div>
      </div>
      <h3>Hello, {user?.first_name}</h3>
      <button className="upload">
        <Link
          to={{ pathname: `/uploadFile/${owner}`, state: { is_active: true } }}
          className="btn_upload"
        >
          Upload file
        </Link>
      </button>
    </div>
  );
};

export default UserInfo;