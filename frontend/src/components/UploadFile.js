import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/UploadFile.css';
import axios from 'axios';

function UploadFile() {
  const owner = useParams().userId;
  console.log('The Owner is:', owner);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    file: null,
    price: '',
    owner: owner,
  });

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
          value={formData.price}
          onChange={handleChange}
          placeholder="Price in Birr"
        />

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