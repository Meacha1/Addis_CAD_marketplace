import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/UploadFile.css';
import axios from 'axios';
import { useEffect } from 'react';
import { getUserInfoById } from '../utils/getUserInfo';

function UploadFile() {
  const owner = useParams().userId;
  const [user_type, setUserType] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    file: null,
    price: '',
    owner: owner,
    is_premium: false,
  });

  const fetchUserInfo = async (id) => {
    try {
      const userInfo = await getUserInfoById(id);
      setUserType(userInfo.user_type);
    } catch (error) {
      console.log(error);
    }
  };
  fetchUserInfo(owner);

  console.log(`user_type: ${user_type}`);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/UploadFile/${owner}/`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      });

      console.log('File uploaded successfully!');
      navigate(`/profile/${owner}`);
    } catch (error) {
      console.error('AxiosError:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="DWG">DWG</option>
          <option value="IMG">Image</option>
          <option value="PDF">PDF</option>
          <option value="DOC">DOC</option>
          <option value="XLS">XLS</option>
          <option value="Rvt">Rvt</option>     
        </select>

        <input
          type="number"
          name="price"
          value={user_type !== 'admin' ? formData.price : 0}
          onChange={handleChange}
          placeholder="Price in Birr"
        />
        {user_type === 'admin' && 
        <select
            name="is_premium"
            value={formData.is_premium}
            onChange={handleChange}
          >
            <option value={true}>Premium</option>
            <option value={false}>Free</option>
          </select>
        }

        <input
          type="file"
          name="file"
          onChange={handleFileChange}
        />

        <button type="submit">Upload File</button>
      </form>
    </div>
  );
}

export default UploadFile;