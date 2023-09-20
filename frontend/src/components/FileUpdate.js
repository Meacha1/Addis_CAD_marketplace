import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../styles/UploadFile.css';
import axios from 'axios';

function FileUpdate() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: 0,
    file: null,
    thumbnail: null,
    attached_files: [],
  });
  const [thumbnailChanged, setThumbnailChanged] = useState(false);
  const [attachedFilesChanged, setAttachedFilesChanged] = useState(false);
  const [fileChanged, setFileChanged] = useState(false);

  const navigate = useNavigate();
  const fileId = useParams().fileId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/FileDetail/${fileId}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        });
        const fileData = response.data;
        setFormData({
          title: fileData.title,
          description: fileData.description,
          category: fileData.category,
          price: fileData.price,
          owner: fileData.owner, // Set owner from API response
        });
      } catch (error) {
        console.error('AxiosError:', error);
      }
    };

    fetchData();
  }, [fileId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData, 
      file: e.target.files[0]
    });
    
    setFileChanged(true);
  };

  const handleThumbnailChange = (e) => {
    setFormData({
      ...formData, 
      thumbnail: e.target.files[0]
    });
    setThumbnailChanged(true);
  };

  const handleAttachedFilesChange = (e) => {
    const attachedFiles = Array.from(e.target.files);
    console.log('Selected Files:', attachedFiles);
    setFormData({
      ...formData,
      attached_files: attachedFiles,
    });
    setAttachedFilesChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();

    if(fileChanged) {
      formPayload.append('file', formData.file);
    }
  
    if(thumbnailChanged) {
      formPayload.append('thumbnail', formData.thumbnail);
    }
  
    if (attachedFilesChanged) {
      console.log('Attached Files:', formData.attached_files);
      formData.attached_files.forEach((file) => {
        formPayload.append('attached_files', file);
      });
    }

    // Only include fields that have been changed
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formPayload.append('category', formData.category);
    formPayload.append('price', formData.price);

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/FileDetail/${fileId}/`, formPayload, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      });
      console.log('Response Data:', response.data);
      window.history.back();
    } catch (error) {
      console.error(error);
    }

    navigate(`/profile/${formData.owner}`);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        ></textarea>

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
          placeholder="Price"
        />
        <h4>Thumbnail:</h4>
        <input
          type="file"
          name="thumbnail"
          onChange={handleThumbnailChange}
        />
        <h4>The main file:</h4>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        <h4>Attached Files:</h4>
        <input
          type="file"
          name="attached_files" // This should be 'attached_files'
          onChange={handleAttachedFilesChange}
          multiple
        />
        {formData.attached_files?.length > 0 && (
          <div className="attached-files">
            <h4>Attached Files:</h4>
            <ul>
              {formData.attached_files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit">Upload File</button>
      </form>
    </div>
  );
}

export default FileUpdate;
