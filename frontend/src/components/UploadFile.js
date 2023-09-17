// UploadFile.js

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/UploadFile.css';
import axios from 'axios';
import { useEffect } from 'react';
import { getUserInfoById } from '../utils/getUserInfo';

function UploadFile() {
  const owner = useParams().userId;
  const [user_type, setUserType] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    file: null, // For the parent file
    price: '',
    owner: owner,
    is_premium: false,
    thumbnail: null, // For the thumbnail
    attached_files: [], // Store attached files as an array
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'file') {
      // Handle the parent file
      const selectedFile = e.target.files[0];
      console.log('Selected parent file:', selectedFile);
      setFormData({
        ...formData,
        file: selectedFile, // Assign the selected file to the 'file' field
      });
    } else if (e.target.name === 'attached_files') {
      // Handle attached files
      const attachedFiles = Array.from(e.target.files); // Convert FileList to an array
      console.log('Selected attached files:', attachedFiles);
      setFormData({
        ...formData,
        attached_files: attachedFiles, // Assign the array of selected files to attached_files
      });
    } else if (e.target.name === 'thumbnail') {
      // Handle the thumbnail
      const selectedThumbnail = e.target.files[0];
      console.log('Selected thumbnail:', selectedThumbnail);
      setFormData({
        ...formData,
        thumbnail: selectedThumbnail, // Assign the selected file to the 'thumbnail' field
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formPayload.append('category', formData.category);
    formPayload.append('file', formData.file);
    formPayload.append('price', formData.price);
    formPayload.append('owner', formData.owner);
    formPayload.append('is_premium', formData.is_premium);
    formPayload.append('thumbnail', formData.thumbnail);
  
    // Append attached files
    formData.attached_files.forEach((file) => {
      formPayload.append('attached_files', file);
    });
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/UploadFile/${owner}/`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percentCompleted}%`);
          setUploadProgress(percentCompleted); // Update the upload progress state
        },
      });
  
      if (response.status === 201) {
        console.log('File uploaded successfully!');
        navigate(`/profile/${owner}`);
      } else {
        console.error('File upload failed:', response.data);
        // Handle error and display to the user
      }
    } catch (error) {
      console.error('AxiosError:', error);
      // Handle network error and display to the user
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
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
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
          required={user_type !== 'admin'}
          min={0}
        />
        {user_type === 'admin' && (
          <select
            name="is_premium"
            value={formData.is_premium}
            onChange={handleChange}
          >
            <option value={true}>Premium</option>
            <option value={false}>Free</option>
          </select>
        )}
        <input
          type="file"
          name="thumbnail"
          required
          onChange={handleFileChange}
        />

        {/* Parent File Input */}
        <input
          type="file"
          name="file"
          required
          onChange={handleFileChange}
        />

        {/* Attached Files Input */}
        <input
          type="file"
          name="attached_files"
          onChange={handleFileChange}
          multiple // Allow multiple file selection
        />

        {/* Display the list of attached files */}
        {formData.attached_files.length > 0 && (
          <div className="attached-files">
            <h4>Attached Files:</h4>
            <ul>
              {formData.attached_files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Display the upload progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="upload-progress">
            <p>Upload Progress: {uploadProgress}%</p>
            <progress value={uploadProgress} max="100"></progress>
          </div>
        )}

        <button type="submit">Upload File</button>
      </form>
    </div>
  );
}

export default UploadFile;
